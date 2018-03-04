
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer


class QuestionList(APIView):
    """ List all questions, or create new question
    """
    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionItem(APIView):
    """ Get or delete a single question
    """
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class QuestionsByUser(APIView):
    """ Returns questions owned by a user
    """
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_user(pk)
        questions = Question.objects.filter(owner=user)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class QuestionChoices(APIView):
    """ Returns choices of a question
    """
    def get_question(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        q = self.get_question(pk)
        choices = Choice.objects.filter(question=q)
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data)


# class ChoiceViewSet(viewsets.ModelViewSet):
    # queryset = Choice.objects.all()
    # serializer_class = ChoiceSerializer
