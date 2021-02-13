import uuid

from django.db import models
from post.models import Post
from user.models import User


class Comment(models.Model):
    """
    This model represent  a Comment:
    Attributes:
        param id: Describes id of the comment
        type id: uuid pk default=uuid4 editable=False
        param content: Describes content of the comment
        type content: str max_length=150
        param creation_date: Describes creation_date of the comment
        type creation_date: int(timestamp) auto_now_add=True
        param author_name: Describes author_name of the comment
        type author_name: str max_length=50
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.CharField(max_length=150)
    creation_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        """
        Magic method is redefined to show the main information about comment
        :return: content
        """
        return f"{self.content}"

    class Meta:
        """
        to set table name in database
        """

        db_table = "comment"
