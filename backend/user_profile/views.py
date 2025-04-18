import json

import jwt
from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from jwt import ExpiredSignatureError, DecodeError

from auth_service.models import Users
from backend_service.settings import JWT_SECRET_KEY
from customSerializers.ProjectSerializer import ProjectSerializer
from customSerializers.UserSerializer import UserDataSerializer
from project_service.models import Project


# Create your views here.

@csrf_exempt
def getUserData(request):
    if request.method == 'GET':
        try:
            token = request.headers.get('Authorization')
            if token and token.startswith('Bearer'):
                token = token.split(' ')[1]
                decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
                user = Users.objects.filter(user_name=decoded.get('username')).first()
                if not user:
                    return JsonResponse({"response_code": "USER_NOT_FOUND"})

                serializer = UserDataSerializer(user)
                return JsonResponse({"data": serializer.data, "response_code": "SUCCESS"}, status=200)
            else:
                return JsonResponse({"response_code": "WRONG_TOKEN_FORMAT"}, status=407)
        except IndexError:
            return JsonResponse({"response_code": "TOKEN_IS_EMPTY"}, status=402)
        except ExpiredSignatureError:
            return JsonResponse({"response_code": "TOKEN_EXPIRED"}, status=401)
        except DecodeError:
            return JsonResponse({"response_code": "TOKEN_DECODE_ERROR"}, status=410)
        except json.JSONDecoder:
            return JsonResponse({"error": "Некорректный JSON", "response_code": "WRONG_JSON"}, status=400)

    else:
        return JsonResponse({"response_code": "UNALLOWED_METHOD"}, 405)

@csrf_exempt
def updateUserProfileData(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            user = Users.objects.filter(user_name=data['user_name']).first()
            if user:
                user.user_fullName = data['user_fullName']
                user.user_phoneNumber = data['user_phoneNumber']
                user.user_description = data['user_description']
                user.save()

                return JsonResponse({"code": "SUCCESS", "info": "User successfully updated"}, status=200)
            else:
                return JsonResponse({'code': 'USER_NOT_FOUND', 'info': 'User not found'}, status=500)
        except BaseException as be:
            return JsonResponse({"code": "ERROR", "info": be}, status=500)
    else:
        return JsonResponse({"code": "UNALLOWED_METHOD"}, 405)

@csrf_exempt
def getUserProjects(request):
    if request.method == 'GET':
        try:
            token = request.headers.get('Authorization')
            if token and token.startswith('Bearer '):
                token = token.split(' ')[1]
                decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
                user = Users.objects.filter(user_name=decoded['username']).first()
                projects = Project.objects.filter(user_id=user.user_id).values()
                serializer = ProjectSerializer(projects, many=True)
                if projects:
                    return JsonResponse({'response_code': "SUCCESS", 'data': serializer.data}, status=200)
                else:
                    return JsonResponse({'response_code': "PROJECTS_NOT_FOUND", 'data': 'none'}, status=500)
        except IndexError:
            return JsonResponse({"response_code": "TOKEN_IS_EMPTY"}, status=402)
        except ExpiredSignatureError:
            return JsonResponse({"response_code": "TOKEN_EXPIRED"}, status=401)
        except DecodeError:
            return JsonResponse({"response_code": "TOKEN_DECODE_ERROR"}, status=410)
        except BaseException as be:
            return JsonResponse({"code": "ERROR", "info": be}, status=500)

    else:
        return JsonResponse({"code": "UNALLOWED_METHOD"}, 405)
