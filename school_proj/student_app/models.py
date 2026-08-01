from django.db import models
from django.core import validators as val
from . import validators
from subject_app.models import Subject


# Create your models here.




class Student(models.Model):
    name: str = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        unique=False,
        validators=[validators.validate_name_format],
    )
    student_email: str = models.EmailField(
        max_length=200,
        null=False,
        blank=False,
        unique=True,
        validators=[validators.validate_school_email],
    )
    personal_email: str = models.EmailField(
        max_length=200, null=True, blank=True, unique=True, default=None
    )
    locker_number: int = models.IntegerField(
        null=False,
        blank=False,
        unique=True,
        default=110,
        validators=[
            val.MinValueValidator(1),
            val.MaxValueValidator(200),
            validators.validate_locker_number,
        ],
    )
    locker_combination = models.CharField(
        max_length=20,
        null=False,
        blank=False,
        unique=False,
        default="12-12-12",
        validators=[validators.validate_combination_format],
    )
    good_student: bool = models.BooleanField(default=True, blank=False, null=False)

    subjects = models.ManyToManyField(
    "subject_app.Subject",
    related_name="students",
    blank=False,
)

    def __str__(self):
        return f"{self.name} - {self.student_email} - {self.locker_number}"
    
    def add_subject(self, subject_id):
            if self.subjects.count() >= 8:
                raise Exception("This students class schedule is full!")
    
            subject = Subject.objects.get(pk=subject_id)
            self.subjects.add(subject)
    
    def remove_subject(self, subject_id):
        if self.subjects.count() < 1:
            raise Exception("This students class schedule is empty!")

        subject = Subject.objects.get(pk=subject_id)

        if subject in self.subjects.all():
            self.subjects.remove(subject)
                
