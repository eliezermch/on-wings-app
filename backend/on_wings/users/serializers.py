from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.html import strip_tags

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'avatar', 'avatar_url')
        extra_kwargs = {
            'avatar_url': {'write_only': True},
        }

    def to_internal_value(self, data):
        if hasattr(data, 'copy'):
            data = data.copy()
        
        if 'avatar' in data:
            avatar_data = data['avatar']
            if isinstance(avatar_data, str) and avatar_data.startswith('http'):
                data['avatar_url'] = avatar_data
                # Remove avatar from data to prevent ImageField validation error
                if 'avatar' in data:
                    del data['avatar']
        
        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['avatar'] = instance.profile_image
        return ret

    def validate(self, attrs):
        for field in ['username', 'first_name', 'last_name']:
            if field in attrs:
                attrs[field] = strip_tags(attrs[field])
        return attrs

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'avatar', 'avatar_url')
        extra_kwargs = {
            'avatar_url': {'write_only': True},
        }

    def to_internal_value(self, data):
        if hasattr(data, 'copy'):
            data = data.copy()
        
        if 'avatar' in data:
            avatar_data = data['avatar']
            if isinstance(avatar_data, str) and avatar_data.startswith('http'):
                data['avatar_url'] = avatar_data
                if 'avatar' in data:
                    del data['avatar']
        
        return super().to_internal_value(data)

    def validate(self, attrs):
        for field in ['username', 'first_name', 'last_name']:
            if field in attrs:
                attrs[field] = strip_tags(attrs[field])
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user
