from django.conf.urls import url, include


urlpatterns = [
    url(r'^', include('polls.urls')),
    url(r'^', include('accounts.urls')),
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.jwt')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
