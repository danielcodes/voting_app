
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
        url = reverse('get_delete_question', kwargs={'pk': 0})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_question(self):
        url = reverse('get_delete_question', kwargs={'pk': self.q2.pk})
        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class QuestionsByUserTests(APITestCase):

    def setUp(self):
        self.user_1 = User.objects.create(
            username='dan',
            email='dan@example.com',
            password='password'
        )
        self.user_2 = User.objects.create(
            username='ron',
            email='ron@example.com',
            password='password'
        )
        self.q1 = Question.objects.create(name='Test question 1', owner=self.user_1)
        self.q2 = Question.objects.create(name='Test question 2', owner=self.user_1)
        self.q3 = Question.objects.create(name='Test question 3', owner=self.user_2)

    def test_get_user_questions_valid(self):
        url = reverse('questions_by_user', kwargs={'pk': self.user_1.pk})
        response = self.client.get(url, format='json')
        questions = Question.objects.filter(owner=self.user_1)
        serializer = QuestionSerializer(questions, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(questions.count(), 2)
        self.assertEqual(response.data, serializer.data)

    def test_get_user_questions_invalid(self):
        url = reverse('questions_by_user', kwargs={'pk': 0})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class QuestionChoicesTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='dan',
            email='dan@example.com',
            password='password'
        )
        self.q1 = Question.objects.create(name='Test question 1', owner=self.user)
        Choice.objects.create(question=self.q1, choice_text='Blah 1')
        Choice.objects.create(question=self.q1, choice_text='Blah 2')

    def test_get_choices_for_question_valid(self):
        url = reverse('question_choices', kwargs={'pk': self.q1.pk})
        response = self.client.get(url, format='json')
        choices = Choice.objects.filter(question=self.q1)
        serializer = ChoiceSerializer(choices, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(choices.count(), 2)
        self.assertEqual(response.data, serializer.data)

    def test_get_choices_for_question_invalid(self):
        url = reverse('question_choices', kwargs={'pk': 0})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
