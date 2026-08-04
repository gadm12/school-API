from .views import AllSubjects, ASubject
from django.urls import path

# api/v1/subject/
urlpatterns = [
    path("", AllSubjects.as_view(), name="all_subjects"),
    
    path("<int:id>/", ASubject.as_view(), name="a_subject"),
]
