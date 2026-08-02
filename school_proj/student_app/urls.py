from .views import AllStudents
from django.urls import path


#api/v1/student/
urlpatterns = [
 path('',AllStudents.as_view(),name='all_student')   
]