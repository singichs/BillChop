# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-06 19:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chop', '0004_users_venmo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receiptmembership',
            name='users',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='chop.Users'),
        ),
    ]
