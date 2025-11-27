from rest_framework import serializers
from .models import DailyVerse

class DailyVerseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyVerse
        fields = ['id', 'date', 'content', 'reference', 'version', 'theme', 'content_es', 'reference_es', 'version_es', 'theme_es']
