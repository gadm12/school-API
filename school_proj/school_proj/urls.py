"""
URL configuration for school_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
import math


def hello(request):

    return HttpResponse("hello world")
    # return HttpResponse(f"<pre>{request.headers}</pre>")


def area_square(request, width):
    return HttpResponse(width * 2)


def circle_radius(request, radius):
    return HttpResponse(math.pi * (radius**2))


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", hello),
    path("square/<int:width>/", area_square),
    path("circle/<int:radius>/", circle_radius),
]
