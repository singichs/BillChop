# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


# all functions with post have "@csrf_exempt" for right now, couldn't test otherwise

def index(request):
    return HttpResponse("Hello, world")

# localhost:8000/chop/receipt/15/
# note trailing slash, we need to include for POST requests while APPEND_SLASH is true		
@csrf_exempt
def receipt(request, user_id):
	if request.method == "GET":
		return HttpResponse("Receipt GET: user_id = " + user_id)
	elif request.method == "POST":
		return HttpResponse(request);

@csrf_exempt
def get_receipt(request):
	if request.method == "POST":
		return HttpResponse(request);

@csrf_exempt
def create_group(request):
	if request.method == "POST":
		return HttpResponse(request);

@csrf_exempt
def group(request):
	if request.method == "GET":
		return HttpResponse("Group GET");
	elif request.method == "PUT":
		return HttpResponse(request);
	elif request.method == "POST":
		return HttpResponse(request);

@csrf_exempt
def payments(request):
	if request.method == "GET":
		return HttpResponse("Payments GET");

@csrf_exempt
def payup(request):
	if request.method == "POST":
		return HttpResponse(request);




