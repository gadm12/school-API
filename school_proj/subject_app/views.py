

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Subject
from .serializers import SubjectSerializer


class AllSubjects(APIView):
    def get(self, request):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)


class ASubject(APIView):

    def retrieve_subject(self, request, subject):
        return get_object_or_404(Subject, subject=subject)

    def get(self, request, subject):
        a_subject = get_object_or_404(
            Subject,
            subject_name__iexact=subject,
        )

        serializer = SubjectSerializer(a_subject)
        return Response(serializer.data)
