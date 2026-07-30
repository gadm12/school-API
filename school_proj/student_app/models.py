from django.db import models


# Create your models here.
class Student(models.Model):
    name: str = models.CharField(max_length=100, null=False, blank=False)
    student_email: str = models.EmailField(max_length=200, null=False, blank=False)
    personal_email: str = models.EmailField(max_length=200, null=True, blank=True)
    locker_number: int = models.IntegerField(null=False, blank=False)
    locker_combination = models.CharField(max_length=20, null=False, blank=False)
    on_team: bool = models.BooleanField(default=False, null=False, blank=False)
    grade: int = models.IntegerField(default=1, null=False, blank=False)

    def __str__(self):
        return f"< Student | {self.name} | {self.locker_number} >"

    def next_grade(self):
        self.grade += 1
        self.save()
