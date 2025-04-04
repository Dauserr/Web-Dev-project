from django.urls import path
from . import views

urlpatterns = [
    path("", views.getUserData, name='getUserData'),
    path("/set-data", views.updateUserProfileData, name='updateUserProfileData'),
    path("/get-user-projects", views.getUserProjects, name='getUserProjects')
]