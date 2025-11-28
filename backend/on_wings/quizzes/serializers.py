from rest_framework import serializers
from .models import Question, Choice, UserQuizProgress

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'testament', 'language', 'level', 'difficulty', 'verse_reference', 'question_type', 'choices']

class UserQuizProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuizProgress
        fields = ['testament', 'current_level', 'total_score']
