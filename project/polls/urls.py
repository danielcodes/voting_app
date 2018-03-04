
from django.conf.urls import url, include
from . import views


urlpatterns = [
    url(r'^questions/$', views.QuestionList.as_view(), name='questions'),
    url(r'^questions/(?P<pk>[0-9]+)/$', views.QuestionItem.as_view(), name='get_delete_question'),
    url(r'^questions/user/(?P<pk>[0-9]+)/$', views.QuestionsByUser.as_view(), name='questions_by_user'),
    url(r'^questions/(?P<pk>[0-9]+)/choices/$', views.QuestionChoices.as_view(), name='question_choices'),
    url(r'^choices/$', views.ChoiceList.as_view(), name='choices'),
    url(r'^choices/(?P<pk>[0-9]+)/$', views.ChoiceItem.as_view(), name='get_choice'),
]
