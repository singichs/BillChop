from django.conf.urls import url

from . import views
from django.contrib.auth import views as auth_views

# can move the url functions to different places
# can include whatever in the actual url, receipt shown as example
urlpatterns = [
    url(r'^$', views.index, name='index'),
	url(r'^receipt/(?P<user_id>\d+)/$', views.receipt, name='receipt'),
	url(r'^get_receipt', views.get_receipt, name='get_receipt'),
	#url(r'^create_group', views.create_group, name='create_group'),
	url(r'^group', views.group, name='group'),
	url(r'^create_group', views.create_group, name='create_group'),
	url(r'^get_user_groups', views.get_user_groups, name='get_user_groups'),
	url(r'^add_users_to_group', views.add_users_to_group, name='add_users_to_group'),
	url(r'^payments', views.payments, name='payments'),
	url(r'^payup', views.payup, name='payup'),
	url(r'^get_users_in_group/(?P<group_name>\w+)/$', views.get_users_in_group, name='get_users_in_group'),
	url(r'^get_user_payments/[0-9]', views.get_user_payments, name='get_user_payments'),
	url(r'^login', auth_views.login, name='login'),
	url(r'^register', views.register, name='register'),
	url(r'^logout/$', auth_views.logout, name='logout'),
]