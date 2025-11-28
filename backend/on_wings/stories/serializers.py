from rest_framework import serializers
from .models import Story, Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'story', 'score', 'created_at']
        read_only_fields = ['user', 'created_at']

class StorySerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()
    average_rating = serializers.ReadOnlyField()

    class Meta:
        model = Story
        fields = ['id', 'title', 'content', 'reference', 'created_at', 'is_liked', 'user_rating', 'average_rating']

    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False

    def get_user_rating(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            try:
                rating = Rating.objects.get(user=user, story=obj)
                return rating.score
            except Rating.DoesNotExist:
                return None
        return None
