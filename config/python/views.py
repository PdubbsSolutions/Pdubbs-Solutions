from django.http import HttpResponse # type: ignore
def home(request):
    return HttpResponse ("Welcome to the Homepage!")

from django.shortcuts import render # type: ignore
def homepage(request):
    return render(request, 'index.html')