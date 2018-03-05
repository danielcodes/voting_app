
from django.contrib.auth.models import User
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework import status

from polls.models import Question, Choice
from polls.permissions import IsOwnerOrReadOnly
from polls.serializers import QuestionSerializer, ChoiceSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('users', request=request, format=format),
        'questions': reverse('questions', request=request, format=format),
        'choices': reverse('choices', request=request, format=format)
    })


class QuestionList(APIView):
    """ List all questions, or create new question
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)

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
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )

    def get_object(self, pk):
        obj = get_object_or_404(Question, pk=pk)
        self.check_object_permissions(self.request, obj)
        return obj

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


class ChoiceList(APIView):
    """ List all choices, or create new choice
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        choices = Choice.objects.all()
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChoiceItem(APIView):
    """ Get, patch or delete a choice
    """
    def get_object(self, pk):
        try:
            return Choice.objects.get(pk=pk)
        except Choice.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        choice = self.get_object(pk)
        serializer = ChoiceSerializer(choice)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        choice = self.get_object(pk)
        serializer = ChoiceSerializer(choice, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        choice = self.get_object(pk)
        choice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
