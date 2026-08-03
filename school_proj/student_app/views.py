# pylint: disable=no-member

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Student
from .serializers import StudentAllSerializer, StudentDetailSerializer

# Create your views here.


class AllStudents(APIView):

    def get(self, request):
        students = Student.objects.all()
        ser_stud = StudentAllSerializer(students, many=True)
        return Response(ser_stud.data)


class AStudent(APIView):
    def get(self, request, id):
        student = get_object_or_404(Student, pk=id)
        ser_stud = StudentDetailSerializer(student)
        return Response(ser_stud.data)
