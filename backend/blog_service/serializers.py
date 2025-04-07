# serializers.py
from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'  # или перечисли явно: ['id', 'title', 'content', 'created_at']