# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=30)
    date_created = models.DateField(auto_now_add=True)
    last_used = models.DateField(auto_now_add=True)
    users = models.ManyToManyField(User, through='UserMembership', related_name='people')

    def __str__(self):
        return self.name 

# TO DO: 
#Subclass  auth user model 
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, default="moo")
    last_name = models.CharField(max_length=30, default="asd")
    venmo = models.CharField(max_length=30, default="hello")
    phone_number = models.CharField(max_length=30, default="+1")
   # email = models.EmailField()

    def full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return self.first_name + " " + self.last_name

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Receipt(models.Model):
    photo_bucket = models.CharField(max_length=30)
    image = models.ImageField(upload_to="receipt_images/", null=True, blank=True)
    timestamp = models.DateField(auto_now_add = True)
    total_cost = models.DecimalField(max_digits=5, decimal_places=2)
    tip = models.DecimalField(max_digits=5, decimal_places=2)
    tax = models.DecimalField(max_digits=5, decimal_places=2)
    title = models.CharField(max_length=30)
    is_complete = models.BooleanField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=1)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, through='ReceiptMembership',  related_name='participants')

    def __str__(self):
        return self.title

class Item(models.Model):
    name = models.CharField(max_length=30)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    user_owns = models.ForeignKey(User, on_delete=models.CASCADE)
    # make functions that return cost per user
    def __str__(self):
        return self.name 

class UserMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)
    role = models.CharField(max_length=30)
    def __str__(self):
        return self.user.first_name + " " + self.group.name

class ReceiptMembership(models.Model):
    users = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE, related_name='receipt')
    notified = models.BooleanField(default=False)
    outstanding_payment = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.users.first_name + " " + str(self.receipt.timestamp)

