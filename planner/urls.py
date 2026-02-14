from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgendaItemViewSet

router = DefaultRouter()
router.register(r'items', AgendaItemViewSet, basename='agendaitem')

urlpatterns = [
    path('', include(router.urls)),
]
