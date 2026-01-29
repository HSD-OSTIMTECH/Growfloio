from django.shortcuts import render
from django.http import HttpResponse

def login_view(request):
    return HttpResponse("Login Sayfası")

def register_view(reques):
    return HttpResponse("Register Sayfası")
