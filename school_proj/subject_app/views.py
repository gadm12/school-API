# pylint: disable=no-member
from django.shortcuts import get_object_or_404
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


class ASubject(APIView):
    def get(self, request, id):
        subject = get_object_or_404(Subject, pk=id)
        ser_subj = SubjectSerializer(subject)
        return Response(ser_subj.data)
