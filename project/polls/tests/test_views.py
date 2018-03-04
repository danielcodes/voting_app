
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase

from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer


class QuestionsTests(APITestCase):

    def setUp(self):
        user = User.objects.create(
            username='dan',
            email='dan@example.com',
            password='password'
        )
        Question.objects.create(name='Test question 1', owner=user)
        Question.objects.create(name='Test question 2', owner=user)

    def test_get_questions(self):
        """ Get all questions
        """
        url = reverse('questions')
        response = self.client.get(url, format='json')
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
