# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    venmo_handle = models.CharField(max_length=30)
    phone_number = PhoneNumberField()
    groups = models.ManyToManyField(Group)
    outstanding_payments = models.ManyToManyField(Payment)
    receipts = models.ManyToManyField(Receipt)

class Receipt(models.Model):

    photo_id = 
    timestamp = models.DateField(auto_now_add = True)
    total_cost = models.DecimalField()
    tip = models.DecimalField()
    tax = models.DecimalField()
    items = 

class Item(models.Model):

    name = models.CharField(max_length=30)
    value = models.DecimalField()
    receipt_id = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    belongs_to = models.ForeignKey(User, on_delete=models.CASCADE)

    # make functions that return cost per user

class Group(models.Model):
    
    name = models.CharField(max_length=30)
    users = 
    payments = 


class Payment(models.Model):
    receipt_id = 
    paid_by = 
    is_complete = models.BooleanField()
    split = 

class Split(models.Model):
    user_id = 
    cost = models.DecimalField()

    #Probably need some user group tables