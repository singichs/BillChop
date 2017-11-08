# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
import json
from chop.models import Group
from chop.models import Item
from chop.models import Profile
from chop.models import Receipt
from chop.models import ReceiptMembership
from chop.models import UserMembership
from chop.serializers import *
from datetime import *
from decimal import *
from django.contrib.auth import authenticate
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
@api_view(['POST'])
def create_group(request):
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    group_name = data["group_name"]
    user_ids = data["user_ids"]
    print(group_name)
    print(user_ids)
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
        user = Users.objects.get(pk=user_id)
        #Todo: Figure out if something else should be default for the role
        # Create user membership for this user to the new group
        m1 = UserMembership(user = user, group = new_group, role="")
        m1.save()
        print(user.groups.all())
    return HttpResponse(status=204)

@login_required
@api_view(['GET'])
def get_user_groups(request):
    print("Request")
    print(request.user.pk)
    print(request.user)

    user = Users.objects.get(pk=request.user.pk)
    print(user.full_name())
    print(user.groups.all())
    user_groups = user.groups.all().values()
    return JsonResponse({'groups':list(user_groups)})

# localhost:8000/chop/get_users_in_group/groupName/
@login_required
@api_view(['GET'])
def get_users_in_group(request, group_name):
    print(group_name)
    if not Group.objects.filter(name=group_name).exists():
        response = HttpResponse("Group name doesn't exist")
        response.status_code = 400
        return response

    #Todo: check if user is in group? or is that done in the frontend?
    group = Group.objects.get(name=group_name)
    users = UserMembership.objects.filter(group=group)
    print(users)
    return JsonResponse({'users':list(users.values())})

@csrf_exempt
@api_view(['POST'])
def add_users_to_group(request):
    body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)
    group_name = data["group_name"]
    user_ids = data["user_ids"]
    if not Group.objects.filter(name=group_name).exists():
        response = HttpResponse("Group name doesn't exist")
        response.status_code = 400
        return response

    group = Group.objects.get(name=group_name)   
    for user_id in user_ids:
        user = Users.objects.get(pk=user_id)
        #Todo: Figure out if something else should be default for the role
        # Create user membership for this user to the new group
        m1 = UserMembership(user = user, group = group, role="")
        m1.save()

    return HttpResponse(204)

@login_required
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

    #Get our user object with logged in user email
    #user = User.objects.filter(email=request.user.email)

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
        data.append(receipt_info)
    
    user_payments = {'payments':  data}
    return Response(user_payments)


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

