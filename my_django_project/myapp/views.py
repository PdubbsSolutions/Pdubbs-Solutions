from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Your Dahsboard")

def about(request):
    return HttpResponse('public/index.html', name="Dashboard")
