from django.shortcuts import render
from rest_framework.views import APIView


class RegisterUserView(APIView):
    def post(self, request):
        new_user_data = request.data