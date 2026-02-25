from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import Category, Experience, Like
from .serializers import CategorySerializer, ExperienceSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.annotate(
        experience_count=Count('experiences'),
        total_likes=Count('experiences__likes')
    )
    serializer_class = CategorySerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().annotate(
        likes_count=Count('likes')
    ).order_by('-created_at')
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = super().get_queryset()
        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        experience = self.get_object()
        like, created = Like.objects.get_or_create(experience=experience, user=request.user)
        
        if not created:
            like.delete()
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        
        return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)
