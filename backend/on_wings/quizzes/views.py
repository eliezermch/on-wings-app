from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Question, UserQuizProgress
from .serializers import QuestionSerializer, UserQuizProgressSerializer
import random

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Question.objects.all()
        testament = self.request.query_params.get('testament')
        language = self.request.query_params.get('language', 'EN')
        level = self.request.query_params.get('level')

        if testament:
            queryset = queryset.filter(testament=testament)
        if language:
            queryset = queryset.filter(language=language)
        if level:
            queryset = queryset.filter(level=level)
            
        return queryset

    @action(detail=False, methods=['get'])
    def random(self, request):
        testament = request.query_params.get('testament')
        language = request.query_params.get('language', 'EN')
        level = request.query_params.get('level')
        
        queryset = Question.objects.all()
        if testament:
            queryset = queryset.filter(testament=testament)
        if language:
            queryset = queryset.filter(language=language)
        if level:
            queryset = queryset.filter(level=level)
        
        count = queryset.count()
        if count == 0:
            return Response([])
            
        # Get up to 10 random questions
        limit = min(count, 10)
        random_questions = random.sample(list(queryset), limit)
        serializer = self.get_serializer(random_questions, many=True)
        return Response(serializer.data)

class UserQuizProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserQuizProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserQuizProgress.objects.all()

    def get_queryset(self):
        return UserQuizProgress.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def my_progress(self, request):
        testament = request.query_params.get('testament')
        if not testament:
            return Response({'error': 'Testament is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        progress, created = UserQuizProgress.objects.get_or_create(
            user=request.user,
            testament=testament
        )
        serializer = self.get_serializer(progress)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def complete_level(self, request):
        testament = request.data.get('testament')
        score = request.data.get('score', 0)
        
        if not testament:
            return Response({'error': 'Testament is required'}, status=status.HTTP_400_BAD_REQUEST)

        progress, created = UserQuizProgress.objects.get_or_create(
            user=request.user,
            testament=testament
        )
        
        # Only increment level if user completed the current level
        # For simplicity, we assume calling this endpoint means level completed
        # In a real app, we might validate the level number
        
        progress.current_level += 1
        progress.total_score += score
        progress.save()
        
        serializer = self.get_serializer(progress)
        return Response(serializer.data)
