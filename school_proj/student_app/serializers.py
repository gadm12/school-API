from rest_framework.serializers import ModelSerializer
from student_app.models import Student
from subject_app.serializers import SubjectSerializer



class StudentAllSerializer(ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            "id",
            "name",
            "student_email",
            "personal_email",
            "locker_number",
            "locker_combination",
            "good_student",
            "subjects",
        ]





# class StudentSerializer(ModelSerializer):
# class Meta:
#     model = Student
#     fields = [
#         "name",
#         "student_email",
#         "locker_number",
#     ]


# class StudentAllSerializer(ModelSerializer):
#     class Meta:
#         model = Student
#         # fields = "__all__"
#         # fields= ["name", "student_email", "locker_number"]
#         exclude = ["id"]
# #
