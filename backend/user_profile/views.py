import json

import jwt
from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from jwt import ExpiredSignatureError

from auth_service.models import Users
from backend_service.settings import JWT_SECRET_KEY


# Create your views here.

@csrf_exempt
def getUserData(request):
    if request.method == 'GET':
        try:
            token = request.headers.get('Authorization')
            if token and token.startswith('Bearer '):
                token = token.split(' ')[1]
                decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
                user = Users.objects.filter(user_name=decoded.get('username')).first()
                if not user:
                    return JsonResponse({"response_code": "USER_NOT_FOUND"})
                return JsonResponse({"data": model_to_dict(user, fields=['user_name', 'user_fullName', 'user_phoneNumber', 'user_description']), "response_code": "SUCCESS"}, status=200)
            else:
                return JsonResponse({"response_code": "WRONG_TOKEN_FORMAT"}, status=407)
        except ExpiredSignatureError:
            return JsonResponse({"response_code": "TOKEN_EXPIRED"}, status=401)
        except json.JSONDecoder:
            return JsonResponse({"error": "Некорректный JSON", "response_code": "WRONG_JSON"}, status=400)

    else:
        return JsonResponse({"response_code": "UNALLOWED_METHOD"}, 405)


def updateUserProfileData(request):
    if request.method == 'PUT':
        pass
    else:
        return JsonResponse({"response_code": "UNALLOWED_METHOD"}, 405)
