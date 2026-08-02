# pylint: disable=no-member
from .serializers import SubjectSerializer
from .models import Subject
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class AllSubjects(APIView):

    def get(self, request):
        subjects = Subject.objects.all()
        ser_subjects = SubjectSerializer(subjects, many=True)
        return Response(ser_subjects.data)
