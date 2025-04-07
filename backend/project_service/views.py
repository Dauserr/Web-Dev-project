from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Project, Photo, Favorite
import json
from datetime import datetime
from django.utils.timezone import make_aware
from auth_service.models import Users


def project_catalogue(request):
    """Каталог проектов"""
    projects = Project.objects.all()
    result = []

    for project in projects:
        user = get_object_or_404(Users, user_id=project.user_id)
        user_full_name = user.user_fullName

        funding_status = (float(project.current_funds) * 100.0 / float(project.target_funds)) if project.target_funds else 0

        days_until_deadline = (project.deadline - datetime.now()).days

        result.append({
            "project_id": project.project_id,
            "title": project.title,
            "description": project.description,
            "category": project.category,
            "funding_status": funding_status,
            "user_id": project.user_id,
            "user_full_name": user_full_name,
            "days_until_deadline": days_until_deadline,
        })

    return JsonResponse({"projects": result})


def project_detail(request, project_id):
    """Страница проекта"""
    print(f"Request for project with ID: {project_id}")
    project = get_object_or_404(Project, project_id=project_id)
    user = get_object_or_404(Users, user_id=project.user_id)
    user_full_name = user.user_fullName

    print(f"Project found: {project.title}")

    days_since_creation = (datetime.now() - project.created_at).days
    days_until_deadline = (project.deadline - datetime.now()).days

    return JsonResponse({
        "project_id": project.project_id,
        "title": project.title,
        "description": project.description,
        "current_funds": project.current_funds,
        "target_funds": project.target_funds,
        "user_id": project.user_id,
        "category": project.category,
        "days_since_creation": days_since_creation,
        "days_until_deadline": days_until_deadline,
        "user_full_name": user_full_name,
    })


@csrf_exempt
def create_project(request):
    """Создание проекта"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)

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

            return JsonResponse({"success": True, "message": "Проект успешно создан", "project_id": project.project_id})

        except Exception as e:
            return JsonResponse({"success": False, "message": f"Ошибка: {str(e)}"})

    return JsonResponse({"error": "Invalid request"}, status=400)


def getCatalog(request):
    if request.method == "GET":
        try:
            enteredprojectname = request.GET.get('enteredProjectName')
            categories = request.GET.get('category').split(',') if request.GET.get('category') else []
            print('categories:', categories)
            project_status = 'ACTIVE' if request.GET.get('project_status') == 'status_active' else 'FINISHED'
            projects_sort = request.GET.get('projects_sort')

            filters = Q()
            if enteredprojectname:
                filters &= Q(title__icontains=enteredprojectname)
            if categories:
                filters &= Q(category__in=categories)
            '''
            if project_status:
                filters &= Q(status=project_status)
            '''
            project = Project.objects.filter(filters)
            if project:
                return JsonResponse({'code': "SUCCESS_FOUND", 'data': list(project.values())}, status=200)
            return JsonResponse({'code': "PROJECT_NOT_FOUND", 'data': []}, status=500)
        except Exception as e:
            return JsonResponse({"code": 'REQUEST_FAILED', "message": f"Ошибка: {str(e)}"}, status=500)

    return JsonResponse({"code": "INVALID_REQUEST"}, status=400)
