from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import UserRateThrottle
from .models import Subject
from .serializers import SubjectSerializer



class AllSubjects(APIView):
    throttle_classes = [UserRateThrottle]
    def get(self, request):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)

        return Response(serializer.data)


class ASubject(APIView):
    throttle_classes = [UserRateThrottle]
    def retrieve_subject(self, id):
        return get_object_or_404(Subject, id=id)

    def get(self, request, id):
        subject = self.retrieve_subject(id)
        serializer = SubjectSerializer(subject)

        return Response(serializer.data)
