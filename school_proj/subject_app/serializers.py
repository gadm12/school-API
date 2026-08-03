from rest_framework.serializers import ModelSerializer, SerializerMethodField
from subject_app.models import Subject
from decimal import Decimal, ROUND_HALF_UP


class SubjectSerializer(ModelSerializer):
    students = SerializerMethodField()
    grade_average = SerializerMethodField()

    class Meta:
        model = Subject
        fields = [
            "subject_name",
            "professor",
            "students",
            "grade_average",
        ]

    def get_students(self, obj):
        return obj.students.count()

    def get_grade_average(self, obj):
        grades = obj.grades.all()

        if not grades.exists():
            return 0

        total = sum(grade.grade for grade in grades)
        average = total / grades.count()

        return average.quantize(
            Decimal("0.01"),
            rounding=ROUND_HALF_UP,
        )
