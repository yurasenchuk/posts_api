from django.apps import AppConfig


class PostConfig(AppConfig):
    name = "post"

    def ready(self):
        from .post_background_worker import amount_of_upvotes_reseter

        amount_of_upvotes_reseter.start()
