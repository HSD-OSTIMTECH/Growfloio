"""
Django URL Configuration - SPA tüm rotaları index.html'e yönlendirir.
"""
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='spa'),
]

if settings.DEBUG and settings.STATICFILES_DIRS:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
