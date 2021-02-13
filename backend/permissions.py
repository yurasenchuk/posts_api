from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of profile to view or edit it.
    """
    message = 'You are not the owner of this object'

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user


class IsOwnerOrAdmin(BasePermission):
    """
    Custom permission to only allow owners of profile of admin to view or edit it.
    """
    message = 'You are not the owner or admin of this object'

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user or request.user.is_superuser or request.method in SAFE_METHODS


class IsSafeOrAdmin(BasePermission):
    """
        Custom permission to only allow anyone to view and only admin to edit it.
    """
    message = 'You are not admin to change this object'

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS or request.user.is_superuser


class IsSafeOrOwner(BasePermission):
    """
        Custom permission to only allow anyone to view and only owner to edit it.
    """
    message = 'You are not the owner to change this object'

    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS or request.user == obj.author
