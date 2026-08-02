# pylint: disable=no-member
from .serializers import StudentAllSerializer
from .models import Student
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class AllStudents(APIView):

    def get(self, request):
        students = Student.objects.all()
        ser_stud = StudentAllSerializer(students, many=True)
        return Response(ser_stud.data)
