from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='dashboard'),
    path('public\app\static\pages\about.html', views.about, name='about'),
]
