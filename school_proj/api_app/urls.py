from django.urls import path
from .views import BookProject

urlpatterns = [
    path("", BookProject.as_view(), name="book_project")
]
