# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
import json
import base64
from chop.models import Group
from chop.models import Item
from chop.models import Profile
from chop.models import Receipt
from chop.models import ReceiptMembership
from chop.models import UserMembership
from chop.serializers import *
from datetime import *
from decimal import *
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import ImageUploadForm
from twilio.rest import Client



# TODO:
# all functions with post have "@csrf_exempt" for right now, couldn't test otherwise
@login_required
def index(request):
    return HttpResponse("Hello, world")

# localhost:8000/chop/receipt/15/
# note trailing slash, we need to include for POST requests while APPEND_SLASH is true      
@login_required
def receipt(request, user_id):

    if request.method == "GET":
        receipts = Receipt.objects.all()
        serializer = ReceiptSerializer(receipts, many=True)
        return JsonResponse(serializer.data, safe=False)
        return HttpResponse("Receipt GET: user_id = " + user_id)
    elif request.method == "POST":
        return HttpResponse(request);

@login_required
def get_receipt(request):
    if request.method == "POST":
        # receipts = Receipt.objects.all()
        # serializer = ReceiptSerializer(receipts, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return HttpResponse(request);

@login_required
@api_view(['GET', 'POST', 'PUT'])
def group(request):
    if request.method == "GET":
        groups = Group.objects.filter(name='bed boi')
        serializer = GroupSerializer(groups, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "PUT":
        return HttpResponse(request);
    elif request.method == "POST":
        #return HttpResponse(request);
        data = JSONParser().parse(request)
        serializer = GroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@csrf_exempt
def create_group(request):
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    group_name = data["group_name"]
    user_ids = data["user_ids"]

    if len(group_name) > 30:
        response = HttpResponse("Group name provided was too long")
        response.status_code = 400
        return response
    if Group.objects.filter(name=group_name).exists():
        response = HttpResponse("Group name already exists")
        response.status_code = 400
        return response

    new_group = Group.objects.create(name=group_name)
    # Assuming the users already exist
    for user_id in user_ids:
        profile = Profile.objects.get(pk=user_id)
        #Todo: Figure out if something else should be default for the role
        # Create user membership for this user to the new group
        m1 = UserMembership(user = profile.user, group = new_group, role="")
        m1.save()
    return HttpResponse(status=204)

@login_required
@api_view(['GET'])
def get_user_groups(request):
    user_groups = UserMembership.objects.filter(user=request.user)
    return JsonResponse({'groups':list(user_groups.values())})

# localhost:8000/chop/get_users_in_group/groupName/
@login_required
@api_view(['GET'])
def get_users_in_group(request, group_id):
    if not Group.objects.filter(pk=group_id).exists():
        response = HttpResponse("Group id doesn't exist")
        response.status_code = 400
        return response

    #Todo: check if user is in group? or is that done in the frontend?
    group = Group.objects.get(pk=group_id)
    users = UserMembership.objects.filter(group=group)
    return JsonResponse({'users':list(users.values())})

@csrf_exempt
@api_view(['POST'])
def add_users_to_group(request):
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    group_id = data["group_id"]
    user_ids = data["user_ids"]
    if not Group.objects.filter(pk=group_id).exists():
        response = HttpResponse("Group id doesn't exist")
        response.status_code = 400
        return response

    group = Group.objects.get(pk=group_id)   
    for user_id in user_ids:
        profile = Profile.objects.get(pk=user_id)
        #Todo: Figure out if something else should be default for the role
        # Create user membership for this user to the new group
        m1 = UserMembership(user = profile.user, group = group, role="")
        m1.save()

    return HttpResponse(204)

@login_required
@csrf_exempt
def payments(request):
    if request.method == "GET":
        return HttpResponse("Payments GET");
    if request.method == "POST":
        groups = Group.objects.filter(name='test boi')
        user = User.objects.get(pk=1)
        m1 = UserMembership(user=user, group=groups[0], date_joined=datetime.now(), role="adminboi")
        m1.save()
        print(groups[0])
        print(user)
        serializer = GroupSerializer(groups, many=True)
        return JsonResponse(serializer.data, safe=False)

@login_required
def payup(request):
    if request.method == "POST":
        return HttpResponse(request);


# Call http://localhost:8000/chop/get_user_payments/1
@login_required
@api_view(['GET'])
def get_user_payments(request, page_num=1):

    data = []

    #Get receipts that user is involved with
    receipt_memberships = ReceiptMembership.objects.filter(users=request.user.pk)

    #Get Receipt information 
    for membership in receipt_memberships:
        receipt = Receipt.objects.get(pk=membership.receipt.pk)

        receipt_info = {}
        receipt_info["title"] = receipt.title

        #If user owns receipt
        if receipt.owner.pk == request.user.pk:
            receipt_info["is_owner"] = True
            receipt_info["cost"] = str(receipt.total_cost)
        #If the user does not own receipt
        else:
            receipt_info["is_owner"] = False
            receipt_info["cost"] = str(membership.outstanding_payment)

        receipt_info["receipt_id"] = receipt.pk
        receipt_info["owner"] = receipt.owner.profile.full_name()
        receipt_info["owner_id"] = receipt.owner.pk
        receipt_info["timestamp"] = receipt.timestamp

        data.append(receipt_info)
    
    user_payments = {'payments':  data}
    return Response(user_payments)

@csrf_exempt
@api_view(['POST'])
def register(request):
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    username = data['username']
    password = data['password']
    email = data['email']

    #try to create user
    try:
        user = User.objects.create_user(username, email, password)
        user.profile.venmo = "eecs"
        user.save()
    except IntegrityError:
        # user already exists
        status = 'user already exists'
    else:
        status = 'new user was created'
   
    return HttpResponse(status)

@csrf_exempt
@api_view(['POST'])
def upload_receipt(request):
    print(request.FILES)
    form = ImageUploadForm(request.POST, request.FILES)
    if form.is_valid():
        receipt = Receipt.objects.get(pk=1)
        receipt.image = form.cleaned_data['image']
        receipt.save()
        return HttpResponse('image upload success')

    return HttpResponse("image wasn't valid")

# getting rid of the api_view wrapper takes away the csrf
@csrf_exempt
def user_login(request):
    print ("current user: " + str(request.user))
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    username = data['username']
    password = data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse("logged in")
        # Redirect to a success page.
    else:
        return HttpResponse("failed to log in")
        # Return an 'invalid login' error message.


# add "twilio" to requirements
# could also just put this into view.payup
# things required: receipt items and the userid for each item
# so if the receipt id is sent, then we can get all items within that receipt
# and get each user per item and send that value to them
@csrf_exempt
def send_notifications(request):
    if request.method == "POST":
        return HttpResponse("s n")



# make sure the to_number is in the format like from_ (below) = "+1xxxxxxxxxx"
def send_sms(to_number, message):
    account_sid = "ACfca8839f241f252e7015e95f8627f8b1"
    auth_token = "be5450946081c391715ea4e18cb12597"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=to_number,
        from_="+12485957908 ",
        body="Hello from Python! - Joe")
    print(message.sid)

