
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, routers
from polls.models import Question, Choice


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    questions = serializers.PrimaryKeyRelatedField(many=True, queryset=Question.objects.all())

    class Meta:
        model = User
        fields = (
            'id',
            'url',
            'username',
            'email',
            'is_staff',
            'questions'
        )
