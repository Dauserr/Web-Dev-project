from rest_framework import serializers
class UserDataSerializer(serializers.Serializer):
    user_name = serializers.CharField()
    user_fullName = serializers.CharField()
    user_phoneNumber = serializers.CharField()
    user_description = serializers.CharField(allow_blank=True, allow_null=True)
