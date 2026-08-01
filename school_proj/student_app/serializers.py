from rest_framework.serializers import ModelSerializer
from .models import Student


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "name",
            "student_email",
            "locker_number",
        ]


class StudentAllSerializer(ModelSerializer):
    class Meta:
        model = Student
        # fields = "__all__"
        # fields= ["name", "student_email", "locker_number"]
        exclude = ["id"]
#