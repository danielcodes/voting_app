

from django.contrib.auth.models import User
from rest_framework import serializers
from polls.models import Question, Choice


class QuestionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Question
        fields = ('id', 'name', 'created', 'owner')


class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ('question', 'choice_text', 'votes')


class UserSerializer(serializers.ModelSerializer):
    questions = serializers.PrimaryKeyRelatedField(many=True, queryset=Question.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'questions')

