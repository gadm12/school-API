from student_app.models import Student
from subject_app.models import Subject
from grade_app.models import Grade

# -------------------------
# Subjects
# -------------------------
python = Subject.objects.create(
    subject_name="Python",
    professor="Professor Adam",
)

django = Subject.objects.create(
    subject_name="Django",
    professor="Professor Sarah",
)

database = Subject.objects.create(
    subject_name="Database",
    professor="Professor James",
)

# -------------------------
# Students
# -------------------------
mohamed = Student.objects.create(
    name="ali S. Gad",
    student_email="ali@school.com",
    personal_email="ali@gmail.com",
    locker_number=101,
)

alice = Student.objects.create(
    name="Alice M. Johnson",
    student_email="alice@school.com",
    personal_email="alice@gmail.com",
    locker_number=102,
)

michael = Student.objects.create(
    name="Michael R. Carter",
    student_email="michael@school.com",
    personal_email="michael@gmail.com",
    locker_number=103,
)

# -------------------------
# Enroll Students
# -------------------------
mohamed.add_subject(python.id)
mohamed.add_subject(django.id)

alice.add_subject(python.id)
alice.add_subject(database.id)

michael.add_subject(database.id)

# -------------------------
# Grades
# -------------------------
Grade.objects.create(
    student=mohamed,
    a_subject=python,
    grade=98.5,
)

Grade.objects.create(
    student=mohamed,
    a_subject=django,
    grade=94.0,
)

Grade.objects.create(
    student=alice,
    a_subject=python,
    grade=91.5,
)

Grade.objects.create(
    student=alice,
    a_subject=database,
    grade=88.0,
)

Grade.objects.create(
    student=michael,
    a_subject=database,
    grade=95.0,
)

print("Sample data created successfully!")

#pm shell < student_app/seed_data.py