from django.urls import path
from .views import project_catalogue, project_detail, create_project, getCatalog, deleteproject

urlpatterns = [
    path("projects", project_catalogue, name="project_catalogue"),
    path("projects/<int:project_id>", project_detail.as_view(), name="project_detail"),
    path("projects/create", create_project, name="create_project"),
    path("catalog", getCatalog, name="getCatalog"),
    path("delete-project/<int:project_id>", deleteproject, name="deleteProject")
]
