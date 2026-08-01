# from student_app.models import Student
# from django.core.serializers import serialize
# import json

# new_student = Student(
#     name="camion M. kah",
#     student_email="kag@school.com",
#     personal_email="kah@gmail.com",
#     locker_number=10,
#     locker_combination="12-12-12",
#     good_student=True,
# )

# new_student.full_clean()
# new_student.save()
# print(new_student)
# print(new_student.id)
# new_student_ser = json.loads(serialize("json", [new_student]))
# print(new_student_ser)
# response_data = new_student_ser[0]["fields"]
# print(response_data)

# pm shell < ./student_app/ex_serlialize/serialize_funck.py
