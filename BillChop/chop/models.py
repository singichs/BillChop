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
    groups = models.ManyToManyField(Group, through='UserMembership', related_name='people')
    receipts = models.ManyToManyField(Receipt, through='ReceiptMembership', related_name='receiptmany')

class Receipt(models.Model):
    photo_bucket = models.CharField(max_length=30)
    timestamp = models.DateField(auto_now_add = True)
    total_cost = models.DecimalField()
    tip = models.DecimalField()
    tax = models.DecimalField()
    is_complete = models.BooleanField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class Item(models.Model):
    name = models.CharField(max_length=30)
    value = models.DecimalField()
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    user_owns = models.ForeignKey(User, on_delete=models.CASCADE)
    # make functions that return cost per user

class Group(models.Model):
    name = models.CharField(max_length=30)
    date_created = models.DateField()
    last_used = models.DateField()

class UserMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    role = models.CharField(max_length=30)

class ReceiptMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    outstanding_payment = models.DecimalField()







