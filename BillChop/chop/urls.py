from django.conf.urls import url

from . import views

# can move the url functions to different places
# can include whatever in the actual url, receipt shown as example
urlpatterns = [
    url(r'^$', views.index, name='index'),
	url(r'^receipt/(?P<user_id>\d+)/$', views.receipt, name='receipt'),
	url(r'^get_receipt', views.get_receipt, name='get_receipt'),
	#url(r'^create_group', views.create_group, name='create_group'),
	url(r'^group', views.group, name='group'),
	url(r'^payments', views.payments, name='payments'),
	url(r'^payup', views.payup, name='payup'),
]