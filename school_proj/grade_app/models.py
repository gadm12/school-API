from django.core import validators
from django.db import models
from student_app.models import Student
from subject_app.models import Subject

class Grade(models.Model):
    grade = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=100.00,
        validators=[
            validators.MinValueValidator(0.00),
            validators.MaxValueValidator(100.00),
        ],
    )

    a_subject = models.ForeignKey(
        "subject_app.Subject",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="grades",
    )

    student = models.ForeignKey(
        "student_app.Student",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="grades",
    )

# Create your models here.
