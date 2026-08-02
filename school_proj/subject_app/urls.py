from .views import AllSubjects
from django.urls import path

# api/v1/student/
urlpatterns = [path("", AllSubjects.as_view(), name="all_subjects")]
