from rest_framework import serializers

from user.serializers import UserSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    This serializer created to work with Comment objects
    """

    class Meta:
        model = Comment
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['author'] = UserSerializer(instance.author).data["username"]
        return data
