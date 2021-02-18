from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import (
    UpdateAPIView,
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer, VoteSerializer
from comment.serializers import CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from permissions import IsSafeOrOwner, IsOwnerOrAdmin


class PostCreateView(CreateAPIView):
    """
    This view created to have an opportunity to CREATE Post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsSafeOrOwner, IsOwnerOrAdmin)


class CommentListForPost(APIView):
    """
    This view created to have an opportunity to READ all comments of certain Post
    """

    queryset = Post.objects.all()
    serializer_class = CommentSerializer

    def get(self, request, pk):
        """
        This method created to have an opportunity to READ all comments of certain Post
        :param pk: pk of Post
        :return: all comments for certain Post
        """
        comments = Post.post_comments.get_queryset(pk)
        serializer = self.serializer_class(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class VoteView(UpdateAPIView):
    """
    This view created to have an opportunity to PARTIAL UPDATE attribute amount_of_upvotes of certain Post
    """

    queryset = Post.objects.all()
    serializer_class = VoteSerializer
    permission_classes = (IsAuthenticated,)

    def patch(self, request, pk):
        """
        This method overridden to upvote the Post with current pk
        :param request:
        :param pk: pk of Post
        :return: amount_of_upvotes for updated Post
        """
        post = self.queryset.get(pk=pk)
        serializer = self.serializer_class(
            instance=post,
            data={"amount_of_upvotes": post.amount_of_upvotes + 1},
            partial=True,
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def reset_amount_of_upvotes(self):
        """
        This method created to reset attribute amount_of_upvotes for all Post
        """
        posts = self.get_queryset()
        try:
            for post in posts:
                serializer = self.serializer_class(
                    instance=post, data={"amount_of_upvotes": 0}, partial=True
                )
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
        except Exception as e:
            print(e)
