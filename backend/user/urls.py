from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, LoginView, LogoutView

urlpatterns = [
    path("sign_up/", UserRegistrationView.as_view()),
    path("sign_in/", LoginView.as_view()),
    path("sign_out/", LogoutView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
]
