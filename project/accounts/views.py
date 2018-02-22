
from django.contrib.auth.models import User
from rest_framework import viewsets
from accounts.serializers import UserSerializer


# need to extend user model later
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
