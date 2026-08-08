from django.shortcuts import render
from rest_framework.views import APIView
from .models import Accounts
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .serializers import AccountsSerializer


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
