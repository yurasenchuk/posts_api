from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.permissions import IsAuthenticated
from permissions import IsSafeOrOwner, IsOwnerOrAdmin


class CreateCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)


class CommentView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsSafeOrOwner,)
