
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase

from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer


class QuestionTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='dan',
            email='dan@example.com',
            password='password'
        )
        Question.objects.create(name='Test question 1', owner=self.user)
        Question.objects.create(name='Test question 2', owner=self.user)

    def test_get_questions(self):
        """ Get all questions
        """
        url = reverse('questions')
        response = self.client.get(url, format='json')
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_create_question_valid_data(self):
        url = reverse('questions')
        data = {'name': 'What is love', 'owner': self.user.pk}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_question_invalid_data(self):
        url = reverse('questions')
        data = {'name': '', 'owner': self.user.pk}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
