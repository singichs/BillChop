# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-12 07:04
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chop', '0011_auto_20171112_0602'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='user_owns',
        ),
    ]
