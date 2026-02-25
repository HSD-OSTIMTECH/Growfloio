from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ExperienceViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'experiences', ExperienceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
