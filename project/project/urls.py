from django.conf.urls import url, include


urlpatterns = [
    url(r'^api/', include('polls.urls')),
    url(r'^api/', include('accounts.urls')),
    url(r'^api/auth/', include('djoser.urls')),
    url(r'^api/auth/', include('djoser.urls.jwt')),
    url(r'^api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
