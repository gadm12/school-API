from django.shortcuts import render
from rest_framework.views import APIView
from .models import Accounts
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .serializers import AccountsSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated


class RegisterUserView(APIView):
    def post(self, request):
        serializer = AccountsSerializer(data=request.data)

        if serializer.is_valid():
            new_user = serializer.save()
            token = Token.objects.create(user=new_user)

            return Response(
                {
                    "user": serializer.data,
                    "token": token.key,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(
            request,
            email=email,
            password=password,
        )

        if user is None:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                "user": user.email,
                "token": token.key,
            },
            status=status.HTTP_200_OK,
        )


class LogOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Successfully logged out."})
