
from django.contrib.auth.models import User
from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer, UserSerializer
from rest_framework import viewsets


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
