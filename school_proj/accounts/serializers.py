from rest_framework.serializers import ModelSerializer

from .models import Accounts


class AccountsSerializer(ModelSerializer):
    class Meta:
        model = Accounts
        fields = ["id", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return Accounts.objects.create_user(**validated_data)
