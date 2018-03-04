
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
        self.q1 = Question.objects.create(name='Test question 1', owner=self.user)
        self.q2 = Question.objects.create(name='Test question 2', owner=self.user)

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

    def test_get_question_by_valid_id(self):
        url = reverse('get_delete_question', kwargs={'pk': self.q1.pk})
        response = self.client.get(url, format='json')
        serializer = QuestionSerializer(self.q1)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_question_by_invalid_id(self):
        url = reverse('get_delete_question', kwargs={'pk': 10})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_question(self):
        url = reverse('get_delete_question', kwargs={'pk': self.q2.pk})
        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
