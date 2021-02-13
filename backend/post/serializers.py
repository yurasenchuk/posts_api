from rest_framework import serializers
from .models import Post
from user.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    """
    This serializer created to work with Post objects
    """

    class Meta:
        model = Post
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['author'] = UserSerializer(instance.author).data["username"]
        return data


class VoteSerializer(serializers.ModelSerializer):
    """
    This serializer created to update amount_of_upvotes
    """

    class Meta:
        model = Post
        fields = ("amount_of_upvotes",)

    def update(self, instance, validated_data):
        """
        This method created to upvote the certain Post instance
        """
        instance.amount_of_upvotes = validated_data.get(
            "amount_of_upvotes", instance.amount_of_upvotes
        )
        instance.save()
        return instance
