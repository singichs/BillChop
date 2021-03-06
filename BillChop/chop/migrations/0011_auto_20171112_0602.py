# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-12 06:02
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chop', '0010_auto_20171112_0416'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='user',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='item',
            name='user_owns',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_owns', to=settings.AUTH_USER_MODEL),
        ),
    ]
