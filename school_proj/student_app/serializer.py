from rest_framework.serializers import ModelSerializer
from .models import Student


class StudentSerializer(ModelSerializer):

    class Meta:
        model = Student
        # fields= ["name", "student_email", "locker_number"]
        fields = "__all__"
        # exclude = ['good_student']
