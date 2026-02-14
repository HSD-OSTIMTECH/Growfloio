from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import AgendaItem
from .serializers import AgendaItemSerializer


class AgendaItemViewSet(viewsets.ModelViewSet):
    """ViewSet for AgendaItem CRUD operations"""
    serializer_class = AgendaItemSerializer
    permission_classes = [AllowAny]
    queryset = AgendaItem.objects.all()

    def perform_create(self, serializer):
        """Set the user to the first user when creating (for development)"""
        from django.contrib.auth.models import User
        user = User.objects.first() or User.objects.create_user(username='test', password='test')
        serializer.save(user=user)
