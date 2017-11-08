# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from chop.models import Group, Receipt, Profile, Item, UserMembership, ReceiptMembership

# Register your models here.
admin.site.register(Group)
admin.site.register(Receipt)
admin.site.register(Profile)
admin.site.register(Item)
admin.site.register(UserMembership)
admin.site.register(ReceiptMembership)
