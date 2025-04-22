from django.db.models import Q
from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Project, Photo, Favorite
import json
from datetime import datetime
from django.utils.timezone import make_aware
from auth_service.models import Users
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProjectSerializer


class ProjectView(APIView):
    def get(self, request, project_id=None):
        if project_id is None:
            # Каталог проектов
            projects = Project.objects.all()
            result = []

            for project in projects:
                user = get_object_or_404(Users, user_id=project.user_id)
                user_full_name = user.user_fullName

                funding_status = (
                    float(project.current_funds) * 100.0 / float(project.target_funds)
                ) if project.target_funds else 0

                days_until_deadline = (project.deadline - datetime.now()).days

                serializer = ProjectSerializer(project)
                project_data = serializer.data
                project_data["user_full_name"] = user_full_name
                project_data["funding_status"] = funding_status
                project_data["days_until_deadline"] = days_until_deadline

                result.append(project_data)

            return Response({"projects": result})

        else:
            # Детали одного проекта
            project = get_object_or_404(Project, project_id=project_id)
            user = get_object_or_404(Users, user_id=project.user_id)

            days_since_creation = (datetime.now() - project.created_at).days
            days_until_deadline = (project.deadline - datetime.now()).days

            serializer = ProjectSerializer(project)
            project_data = serializer.data
            project_data["user_full_name"] = user.user_fullName
            project_data["user_bio"] = user.user_description
            project_data["days_since_creation"] = days_since_creation
            project_data["days_until_deadline"] = days_until_deadline

            return Response(project_data)

    def post(self, request):
        try:
            data = request.data

            deadline = datetime.strptime(data["deadline"], "%Y-%m-%d")
            deadline = make_aware(deadline)

            project = Project.objects.create(
                title=data["title"],
                description=data["description"],
                user_id=data["user_id"],
                category=data.get("category"),
                target_funds=data["target_funds"],
                deadline=deadline
            )

            return Response({
                "success": True,
                "message": "Проект успешно создан",
                "project_id": project.project_id
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Ошибка: {str(e)}"
            }, status=400)

    def delete(self, request, project_id):
        try:
            project = get_object_or_404(Project, project_id=project_id)
            project.delete()
            return Response({
                "code": "SUCCESS_DELETE",
                "message": "Проект успешно удалён"
            }, status=200)
        except Exception as e:
            return Response({
                "code": "REQUEST_FAILED",
                "message": f"Ошибка при удалении: {str(e)}"
            }, status=500)


def getCatalog(request):
    if request.method == "GET":
        try:
            enteredprojectname = request.GET.get('enteredProjectName')
            categories = request.GET.get('category')
            categories = categories.split(',') if categories else []
            project_status = request.GET.get('project_status')
            projects_sort = request.GET.get('projects_sort')

            filters = Q()
            if enteredprojectname:
                filters &= Q(title__icontains=enteredprojectname)
            if categories:
                filters &= Q(category__in=categories)
            if project_status:
                if project_status == 'status_active':
                    filters &= Q(status='ACTIVE')
                elif project_status == 'status_finished':
                    filters &= Q(status='FINISHED')

            project = Project.objects.filter(filters)

            if project:
                return JsonResponse({'code': "SUCCESS_FOUND", 'data': list(project.values())}, status=200)
            return JsonResponse({'code': "PROJECT_NOT_FOUND", 'data': []}, status=500)
        except Exception as e:
            return JsonResponse({"code": 'REQUEST_FAILED', "message": f"Ошибка: {str(e)}"}, status=500)

    return JsonResponse({"code": "INVALID_REQUEST"}, status=400)
