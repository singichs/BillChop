# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from models import Group, Receipt, User, UserMembership, Item, ReceiptMembership
from serializers import *

# TODO:

# 

# all functions with post have "@csrf_exempt" for right now, couldn't test otherwise

def index(request):
    return HttpResponse("Hello, world")

# localhost:8000/chop/receipt/15/
# note trailing slash, we need to include for POST requests while APPEND_SLASH is true      
@csrf_exempt
def receipt(request, user_id):
    if request.method == "GET":
        receipts = Receipt.objects.all()
        serializer = ReceiptSerializer(receipts, many=True)
        return JsonResponse(serializer.data, safe=False)
        return HttpResponse("Receipt GET: user_id = " + user_id)
    elif request.method == "POST":
        return HttpResponse(request);

@csrf_exempt
def get_receipt(request):
    if request.method == "POST":
        # receipts = Receipt.objects.all()
        # serializer = ReceiptSerializer(receipts, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return HttpResponse(request);

@api_view(['GET', 'POST', 'PUT'])
def group(request):
    if request.method == "GET":
        groups = Group.objects.filter(name='test boi')
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
            print serializer.data
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@csrf_exempt
def payments(request):
    if request.method == "GET":
        return HttpResponse("Payments GET");

@csrf_exempt
def payup(request):
    if request.method == "POST":
        return HttpResponse(request);




