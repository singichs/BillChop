from django.conf.urls import url

from . import views
from django.contrib.auth import views as auth_views

# can move the url functions to different places
# can include whatever in the actual url, receipt shown as example
urlpatterns = [
    url(r'^$', views.index, name='index'),
	url(r'^receipt/(?P<user_id>\d+)/$', views.receipt, name='receipt'),
	url(r'^get_receipt/(?P<receipt_id>\d+)/$', views.get_receipt, name='get_receipt'),
	#url(r'^create_group', views.create_group, name='create_group'),
	url(r'^group', views.group, name='group'),
	url(r'^create_group', views.create_group, name='create_group'),
	url(r'^add_group_to_receipt', views.add_group_to_receipt, name='add_group_to_receipt'),
	url(r'^get_user_groups', views.get_user_groups, name='get_user_groups'),
	url(r'^add_users_to_group', views.add_users_to_group, name='add_users_to_group'),
	url(r'^add_item_to_receipt', views.add_item_to_receipt, name='add_item_to_receipt'),
	url(r'^delete_item_from_receipt', views.delete_item_from_receipt, name='delete_item_from_receipt'),
	url(r'^get_group_receipts/(?P<group_id>\d+)/$', views.get_group_receipts, name='get_group_receipts'),
	url(r'^payments', views.payments, name='payments'),
	url(r'^payup', views.payup, name='payup'),
	url(r'^get_users_in_group/(?P<group_id>\d+)/$', views.get_users_in_group, name='get_users_in_group'),
	url(r'^get_user_payments', views.get_user_payments, name='get_user_payments'),
	url(r'^login', auth_views.login, name='login'),
	url(r'^register', views.register, name='register'),
	#url(r'^upload_receipt', views.upload_receipt, name='upload_receipt'),
	url(r'^user_logout/$', views.user_logout, name='user_logout'),
	url(r'^check_logged_in/$', views.check_logged_in, name='check_logged_in'),
	url(r'^upload_receipt', views.upload_receipt, name='upload_receipt'),
	url(r'^logout/$', auth_views.logout, name='logout'),
	url(r'^user_login/$', views.user_login, name='user_login'),
	url(r'^send_notifications/$', views.send_notifications, name='send_notifications'),
	url(r'^add_user_to_receipt', views.add_user_to_receipt, name='add_user_to_receipt'),
	url(r'^add_user_to_app', views.add_user_to_app, name='add_user_to_app'),
	url(r'^get_mutual_transactions/(?P<user_id>\d+)/$', views.get_mutual_transactions, name='get_mutual_transactions'),
	url(r'^add_receipt_information', views.add_receipt_information, name='add_receipt_information'),

]

