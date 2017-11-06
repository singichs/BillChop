# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from chop.models import Group, Receipt, Users, UserMembership, Item, ReceiptMembership
from chop.serializers import *
from datetime import *
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
import json
from django.db import IntegrityError



# TODO:

# 

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

@login_required
@api_view(['GET'])
def get_user_payments(request):
    print (request.user.email)

    #Get our user object with logged in user email
    user = Users.objects.filter(email=request.user.email)

    #Get receipts that user is involved with
    receipt_memberships = ReceiptMembership.objects.filter(users=user[0].pk)

    print (receipt_memberships)



    return HttpResponse("Hello, world")


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
    except IntegrityError:
        # user already exists
        status = 'user already exists'
    else:
        new_user = Users(first_name = username, last_name= "default", email= email)
        new_user.save()
        status = 'new user was created'
   
    return HttpResponse(status)

