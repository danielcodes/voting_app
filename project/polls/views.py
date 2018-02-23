
from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@api_view(['GET'])
def choices_list(request, pk):
    """ Returns choices corresponding to a question
    """
    queryset = Choice.objects.filter(question__pk=pk)
    serializer = ChoiceSerializer(queryset, many=True)
    return Response(serializer.data)


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
