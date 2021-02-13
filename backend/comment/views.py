from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.permissions import IsAuthenticated
from permissions import IsSafeOrOwner, IsOwnerOrAdmin


class CreateCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_serializer(self, *args, **kwargs):
        """
        This method overridden to have an opportunity to add current user as an author of new Comment
        """
        serializer_class = self.get_serializer_class()
        kwargs["context"] = self.get_serializer_context()
        data = self.request.data.copy()
        data["author"] = self.request.user.id
        kwargs["data"] = data
        return serializer_class(*args, **kwargs)


class CommentView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsSafeOrOwner,)
