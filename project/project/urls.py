from django.conf.urls import url, include
from accounts import views as AccountsViews
from polls import views as PollsViews


urlpatterns = [
    url(r'^', include('polls.urls')),
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.jwt')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
