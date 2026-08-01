from rest_framework.serializers import ModelSerializer

from .models import Grade


class GradeSerializer(ModelSerializer):
    class Meta:
        model = Grade
        fields = "__all__"
