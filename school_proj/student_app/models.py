from django.db import models
from django.core import validators
from .validators import (
    validate_school_email,
    validate_name_format,
    validate_combination_format,
)


# Create your models here.
class Student(models.Model):
    name: str = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        unique=False,
        validators=[validate_name_format],
    )
    student_email: str = models.EmailField(
        max_length=200,
        null=False,
        blank=False,
        unique=True,
        validators=[validate_school_email],
    )
    personal_email: str = models.EmailField(
        max_length=200, null=True, blank=True, unique=True, default=None
    )
    locker_number: int = models.IntegerField(
        null=False,
        blank=False,
        unique=True,
        default=110,
    )
    locker_combination = models.CharField(
        max_length=20,
        null=False,
        blank=False,
        unique=False,
        default="12-12-12",
        validators=[validate_combination_format],
    )
    good_student: bool = models.BooleanField(default=True, blank=False, null=False)

    def __str__(self):
        return f"{self.name} - {self.student_email} - {self.locker_number}"
