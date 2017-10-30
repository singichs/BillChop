# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from chop.models import Group, Receipt, User, Item, UserMembership, ReceiptMembership

# Register your models here.


admin.site.register(Group)
admin.site.register(Receipt)
admin.site.register(User)
admin.site.register(Item)
admin.site.register(UserMembership)
admin.site.register(ReceiptMembership)
