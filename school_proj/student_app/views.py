from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Student
from .serializers import StudentAllSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.


class AllStudents(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        students = Student.objects.all().order_by("id")
        serialize = StudentAllSerializer(students, many=True)
        return Response(serialize.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StudentAllSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


class AStudent(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def retrieve_student(self, id):

        return get_object_or_404(Student, id=id)

    def get(self, request, id):
        student = self.retrieve_student(id)
        serialize = StudentAllSerializer(student)
        return Response(serialize.data)

    def delete(self, request, id):
        student = self.retrieve_student(id)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id):
        student = self.retrieve_student(id)

        serializer = StudentAllSerializer(
            student,
            data=request.data,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, id):
        student = self.retrieve_student(id)

        serializer = StudentAllSerializer(
            student,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
