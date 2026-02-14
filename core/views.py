from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    """Serve the frontend index.html"""
    template_name = 'index.html'
    content_type = 'text/html'

