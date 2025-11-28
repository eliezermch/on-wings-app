from django.db import models
from django.conf import settings

class Question(models.Model):
    TESTAMENT_CHOICES = [
        ('OLD', 'Old Testament'),
        ('NEW', 'New Testament'),
    ]
    QUESTION_TYPE_CHOICES = [
        ('SINGLE', 'Single Choice'),
        ('MULTIPLE', 'Multiple Choice'),
    ]

    LANGUAGE_CHOICES = [
        ('EN', 'English'),
        ('ES', 'Spanish'),
    ]

    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]

    text = models.CharField(max_length=500)
    testament = models.CharField(max_length=3, choices=TESTAMENT_CHOICES)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='EN')
    level = models.IntegerField(default=1)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='EASY')
    verse_reference = models.CharField(max_length=100, blank=True, null=True)
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPE_CHOICES, default='SINGLE')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class UserQuizProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_progress')
    testament = models.CharField(max_length=3, choices=Question.TESTAMENT_CHOICES)
    current_level = models.IntegerField(default=1)
    total_score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'testament')

    def __str__(self):
        return f"{self.user.username} - {self.testament} - Level {self.current_level}"
