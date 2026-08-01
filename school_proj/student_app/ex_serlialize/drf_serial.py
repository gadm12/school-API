from student_app.models import Student
from school_proj.student_app.serializers import StudentSerializer

all_students = Student.objects.all()
ser_student = StudentSerializer(all_students, many=True)

print(ser_student.data)

dict_data = {
    "name": "David M. Hickman",
    "student_email": "dmh@school.com",
    "locker_number": 2,
}

new_student = StudentSerializer(data=dict_data)
if new_student.is_valid():
    new_student.save()
    print(new_student.data)
else:
    print(new_student.errors.get("name"))
