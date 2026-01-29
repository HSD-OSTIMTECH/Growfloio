from django.shortcuts import render
from django.http import HttpResponse

def category_list(request):
    return HttpResponse("Kategoriler sayfası")

