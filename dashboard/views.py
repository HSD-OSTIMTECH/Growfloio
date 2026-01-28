from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Dashboard sayfası...")
# Create your views here.
