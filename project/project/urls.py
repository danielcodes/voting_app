from django.conf.urls import url, include
from rest_framework import routers
from accounts import views as AccountsViews
from polls import views as PollsViews


# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()

# NEED TO FIX THIS UP AS CANT IMPORT MANY VIEWS
router.register(r'questions', PollsViews.QuestionViewSet)
router.register(r'choices', PollsViews.ChoiceViewSet)
router.register(r'users', AccountsViews.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^questions/(?P<pk>[0-9]+)/choices/$', PollsViews.choices_list),
    url(r'^questions/user/(?P<pk>[0-9]+)/$', PollsViews.user_questions_list),
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.jwt')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
