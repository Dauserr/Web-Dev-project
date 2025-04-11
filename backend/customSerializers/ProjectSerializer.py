from rest_framework import serializers


class ProjectSerializer(serializers.Serializer):
    project_id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    user_id = serializers.CharField(max_length=100)
    category = serializers.CharField(max_length=100)
    current_funds = serializers.DecimalField(max_digits=10, decimal_places=2)
    target_funds = serializers.DecimalField(max_digits=10, decimal_places=2)
    created_at = serializers.DateTimeField()
    deadline = serializers.DateTimeField()
    status = serializers.CharField(max_length=20)