
from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


# class QuestionViewSet(viewsets.ModelViewSet):
    # queryset = Question.objects.all()
    # serializer_class = QuestionSerializer

class QuestionList(APIView):
    """ List all questions, or create new question
    """
    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def choices_list(request, pk):
    """ Returns choices corresponding to a question
    """
    queryset = Choice.objects.filter(question__pk=pk)
    serializer = ChoiceSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_questions_list(request, pk):
    """ Returns questions owned by a user
    """
    queryset = Question.objects.filter(owner=pk)
    serializer = QuestionSerializer(queryset, many=True)
    return Response(serializer.data)


# class ChoiceViewSet(viewsets.ModelViewSet):
    # queryset = Choice.objects.all()
    # serializer_class = ChoiceSerializer
