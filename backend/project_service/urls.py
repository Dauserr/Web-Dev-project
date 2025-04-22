from django.urls import path
from .views import getCatalog, ProjectView

urlpatterns = [
    path("projects", ProjectView.as_view(), name="project_catalogue"),
    path("project-create", ProjectView.as_view(), name="create_project"),
    path("projects/<int:project_id>", ProjectView.as_view(), name="project_detail"),
    path("catalog", getCatalog, name="getCatalog"),]
