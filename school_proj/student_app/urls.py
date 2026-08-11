from django.urls import path, register_converter
from .views import AllStudents, AStudent


# class IntOrStrConverter:
#     regex = r"[0-9]+|[a-zA-Z]+"

#     def to_python(self, value):
#         return int(value) if value.isdigit() else value

#     def to_url(self, value):
#         return str(value)


# register_converter(IntOrStrConverter, "int_str")

urlpatterns = [
    path("", AllStudents.as_view(), name="all_students"),
    path("<int:id>/", AStudent.as_view(), name="a_student"),
]
