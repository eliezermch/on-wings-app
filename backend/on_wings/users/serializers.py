from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.html import strip_tags

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        for field in ['username', 'first_name', 'last_name']:
            if field in attrs:
                attrs[field] = strip_tags(attrs[field])
        return attrs

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

    def validate(self, attrs):
        for field in ['username', 'first_name', 'last_name']:
            if field in attrs:
                attrs[field] = strip_tags(attrs[field])
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user
