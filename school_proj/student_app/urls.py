from django.urls import path
from .views import AllStudents

urlpatterns = [
    path("", AllStudents.as_view(), name="all_students"),
]
