from django.db import models
from django.core import validators as val
from . import validators



# Create your models here.
class Subject(models.Model):

    subject_name: str = models.CharField(
        unique=True,
        null=False,
        blank=False,
        validators=[validators.validate_subject_format],
    )
    professor: str = models.CharField(
        null=False,
        blank=False,
        default="Mr. Cahan",
        validators=[validators.validate_professor_name],
    )

    def __str__(self):
        return (
            f"{self.subject_name} - " f"{self.professor} - " f"{self.students.count()}"
        )

    def add_a_student(self, student_id):
        if self.students.count() >= 31:
            raise Exception("This subject is full!")

        self.students.add(student_id)

    def drop_a_student(self, student_id):
        if self.students.count() < 1:
            raise Exception("This subject is empty!")

        self.students.remove(student_id)
