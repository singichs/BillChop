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
from django.db.models import Count
from .forms import ImageUploadForm
from twilio.rest import Client
from pytesseract import image_to_string
from PIL import Image, ImageEnhance
from django.db.models import Q
import datetime


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
@api_view(['GET'])
def get_receipt(request, receipt_id):

    receipt = Receipt.objects.get(pk=receipt_id)

    serializer = ReceiptSerializer(receipt)
    data = {'receipt': serializer.data}
    
    items = Item.objects.filter(receipt=receipt_id)

    item_data = []

    for item in items:
        serializer = ItemSerializer(item)
        item_data.append(serializer.data)

    data['items'] = item_data
    the_data = {'data':  data}

    # serializer = ReceiptSerializer(receipts, many=True)
    # return JsonResponse(serializer.data, safe=False)
    return JsonResponse(the_data);

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
def get_user_groups(request):
    user_groups = UserMembership.objects.filter(user=request.user)
    return JsonResponse({'groups':list(user_groups.values())})

# localhost:8000/chop/get_users_in_group/groupName/
@login_required
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

@csrf_exempt
def payments(request):
    if request.method == "GET":
        return HttpResponse("Payments GET");
    if request.method == "POST":
        # should check if group exists first
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

@csrf_exempt
@login_required
def add_item_to_receipt(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        receipt = Receipt.objects.get(pk=data['receipt_id'])
        name = data['name']
        value = data['value']
        user_owns = User.objects.get(pk=data['user_id'])
        item = Item(name=name, value = value, receipt = receipt, user_owns = user_owns)
        item.save()

        return HttpResponse("Item " + item + "added to receipt")
    else:
        return HttpResponse("Requires a get request")

@csrf_exempt
def delete_item_from_receipt(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        try:
            receipt = Item.objects.get(pk=data['item_id'])
            receipt.delete() 
        except Exception:
            return HttpResponse("Item already deleted")

        return HttpResponse("Item deleted from Receipt")
    else:
        return HttpResponse("Requires a get request")



@login_required
@api_view(['GET'])
def get_group_receipts(request, group_id):

    receipts = Receipt.objects.filter(group=group_id)

    receipt_data =[]

    for receipt in receipts:
        serializer = ReceiptSerializer(receipt)
        receipt_data.append(serializer.data)

    data = {'receipts': receipt_data}
    
    return JsonResponse(data)


def get_receipt_home(user_pk, receipt_memberships):

    data = []
    for membership in receipt_memberships:
        receipt = Receipt.objects.get(pk=membership.receipt.pk)

        receipt_info = {}
        receipt_info["title"] = receipt.title

        #If user owns receipt
        if receipt.owner.pk == user_pk:
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

    return data


# Call http://localhost:8000/chop/get_user_payments/1
@login_required
@api_view(['GET'])
def get_user_payments(request, page_num=1):

    #Get receipts that user is involved with
    receipt_memberships = ReceiptMembership.objects.filter(users=request.user.pk)

    #Get Receipt information 
    data = get_receipt_home(request.user.pk, receipt_memberships)
    
    user_payments = {'payments':  data}
    return JsonResponse(user_payments)

# email is the same thing username
@csrf_exempt
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


# add items to users 

# Add group to be associated with receipt. Also update last used time of group.s
@csrf_exempt
def add_group_to_receipt(request):
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    group_id = data["group_id"]
    receipt_id = data["receipt_id"]

    group = Group.objects.get(pk=group_id)
    receipt = Receipt.objects.get(pk=receipt_id)

    group.last_used = datetime.datetime.now()
    group.save()
    receipt.group = group
    receipt.save()
    return HttpResponse("Group has been added to receipt")
'''
@csrf_exempt
def upload_receipt(request):
    print(request.FILES)
    form = ImageUploadForm(request.POST, request.FILES)
    if form.is_valid():
        receipt = Receipt.objects.get(pk=1)
        receipt.image = form.cleaned_data['image']
        receipt.save()
        img = Image.open(form.cleaned_data['image'].file)
        enhancer = ImageEnhance.Contrast(img)
        new_img = enhancer.enhance(35)
        new_img.show()
        print(type(new_img))
        # image_to_string is the receipt parsing function that returns the text from the image
        print(image_to_string(new_img))
        return HttpResponse('image upload success')

    return HttpResponse("image wasn't valid")
'''
def change_contrast(img, level):
    factor = (259 * (level + 255)) / (255 * (259 - level))
    def contrast(c):
        return 128 + factor * (c - 128)
    return img.point(contrast)

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
        print ("logged in As")
        print (user)
        login(request, user)
        return HttpResponse("logged in")
        # Redirect to a success page.
    else:
        print ("Failed to log in")
        return HttpResponse("failed to log in")
        # Return an 'invalid login' error message.


# add "twilio" to requirements
# could also just put this into view.payup
# things required: receipt items and the userid for each item - so just receipt id
# so if the receipt id is sent, then we can get all items within that receipt
# and get each user per item and send that value to them
@csrf_exempt
def send_notifications(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        # should do checking to make sure that person making request owns receipt
        # also have to make sure owner doesn't get notification of things being sent, maybe confirmation
        receipt = Receipt.objects.get(pk=data["receipt_id"])
        owner = Profile.objects.get(user=receipt.owner)
        print (owner.first_name + " " + owner.last_name)
        items = Item.objects.filter(receipt=receipt)
        for item in items:
            profile = Profile.objects.get(user=item.user_owns)
            # properly get receipt owner's name - this doesn't work - sending works fine
            msg = "Hello " + profile.first_name + ", you owe " + owner.first_name + " " + owner.last_name + " $" + str(item.value)
            send_sms(profile.phone_number, msg)
        # return status code
        return HttpResponse("notifications sent")



# make sure the to_number is in the format like from_ (below) = "+1xxxxxxxxxx"
def send_sms(to_number, message):
    account_sid = "ACfca8839f241f252e7015e95f8627f8b1"
    auth_token = "be5450946081c391715ea4e18cb12597"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=to_number,
        from_="+12485957908 ",
        body=message)
    print(message)

# receiptid (receipt membership), firstname, lastname
@csrf_exempt
def add_user_to_receipt(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        username = data['firstname']
        password = data['lastname']
        phone_number = data['phone_number']
        receipt_id = data['receipt_id']


        try:
            profile = Profile.objects.get(phone_number=phone_number)
            print (profile)
            user = User.objects.get(profile=profile)
            print (user)
            receipt = Receipt.objects.get(pk=receipt_id)
            membership = ReceiptMembership.objects.create(users=user, receipt=receipt, outstanding_payment=0)
            membership.save()
            # user_payments = {'payments':  data}
            return JsonResponse({'user_id': user.pk})

        except:
            print ("no similar number found")
            try:
                # HAVE TO MAKE SURE THAT FIRSTNAME AND LASTNAME COMBINATION IS UNIQUE - OR ELSE USER 
                # CAN'T BE CREATED
                new_username = data['firstname'] + "." + data['lastname']
                new_user = User.objects.create_user(username=new_username, email=new_username, password="password")
                new_user.profile.venmo = "eecs"
                new_user.profile.phone_number = phone_number
                new_user.save()
                return JsonResponse({'user_id': new_user.pk})
            except IntegrityError:
                # user already exists
                status = 'user already exists'
                print (status)
    
    return HttpResponse("add user to receipt", status)








@csrf_exempt
def get_mutual_transactions(request, user_id):
    receipt_memberships = ReceiptMembership.objects.filter(Q(users=user_id) | Q(users=request.user.pk)).distinct('receipt')
    data = get_receipt_home(request.user.pk, receipt_memberships)
    
    user_payments = {'payments':  data}
    return JsonResponse(user_payments)
  