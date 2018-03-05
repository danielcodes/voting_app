
from django.contrib.auth.models import User
from rest_framework import serializers
from polls.models import Question, Choice


class UserSerializer(serializers.ModelSerializer):
    questions = serializers.PrimaryKeyRelatedField(many=True, queryset=Question.objects.all())

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'is_staff',
            'questions'
        )
