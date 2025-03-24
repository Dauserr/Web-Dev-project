import datetime

from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import jwt
from django.conf import settings
from auth_service.models import Users


# Create your views here.

@csrf_exempt
def auth_handler(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            auth_mode = data.get('auth_mode')

            user = Users.objects.filter(user_name=username).first()
            user_existence = user is not None
            password_validation = user.user_password == password if user else False
            if auth_mode == 'login':
                if not user_existence:
                    return JsonResponse({"AUTH_STATUS": "USER_NOT_EXISTS"}, status=400)
                if not password_validation:
                    return JsonResponse({"AUTH_STATUS": "INCORRECT_PASSWORD"}, status=400)

                payload = {
                    'username': username,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
                    'iat': datetime.datetime.utcnow()
                }
                secret_key = settings.JWT_SECRET_KEY
                token = jwt.encode(payload, secret_key, algorithm='HS256')

                return JsonResponse({
                    "AUTH_STATUS": "SUCCESS_LOGIN",
                    "access_token": token
                }, status=200)

            elif auth_mode == 'register':
                if user_existence:
                    return JsonResponse({"AUTH_STATUS": "ALREADY_EXISTS"}, status=400)

                last_user = Users.objects.order_by('-user_id').values_list('user_id', flat=True).first()
                last_userid = int(last_user.split('_')[1]) if last_user else 0
                new_user = Users.objects.create(
                    user_id=f"user_{last_userid + 1}",
                    user_name=username,
                    user_password=password
                )
                return JsonResponse({"AUTH_STATUS": "SUCCESS_REGISTER"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Некорректный JSON"}, status=400)
    return JsonResponse({"error": "Только POST-запросы разрешены"}, status=405)
