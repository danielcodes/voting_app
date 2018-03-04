
from django.conf.urls import url, include
from . import views


urlpatterns = [
    url(r'^questions/$', views.QuestionList.as_view(), name='questions'),
    url(r'^questions/(?P<pk>[0-9]+)/choices/$', views.choices_list),
    url(r'^questions/user/(?P<pk>[0-9]+)/$', views.user_questions_list),
]
