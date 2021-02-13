import uuid
from django.db import models

from user.models import User


class Post(models.Model):
    """
    This model represent  a Post:
    Attributes:
        param id: Describes id of the comment
        type id: uuid pk default=uuid4 editable=False
        param title: Describes title of the post
        type title: str max_length=75, unique
        param link: Describes link of the post
        type link: str max_length=50, unique
        param creation_date: Describes creation_date of the post
        type creation_date: int(timestamp) auto_now_add=True
        param amount_of_upvotes: Describes amount_of_upvotes of the post
        type amount_of_upvotes: int default=0
        param author_name: Describes author_name of the post
        type author_name: str max_length=50
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=75, unique=True)
    link = models.CharField(max_length=50, unique=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    amount_of_upvotes = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    objects = models.Manager()

    class PostComments(models.Manager):
        """
        This manager created to have an opportunity to get all comments by post_pk
        """

        def get_queryset(self, pk):
            return super().get_queryset().get(pk=pk).comments

    post_comments = PostComments()

    def __str__(self):
        """
        Magic method is redefined to show the main information about Post
        :return: title
        """
        return f"{self.title}"

    class Meta:
        """
        to set table name in database
        """

        db_table = "post"
