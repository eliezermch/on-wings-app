from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Story, Rating
from .serializers import StorySerializer, RatingSerializer

class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Story.objects.all().order_by('-created_at')
    serializer_class = StorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        story = self.get_object()
        user = request.user
        if story.likes.filter(id=user.id).exists():
            story.likes.remove(user)
            liked = False
        else:
            story.likes.add(user)
            liked = True
        return Response({'liked': liked})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def rate(self, request, pk=None):
        story = self.get_object()
        user = request.user
        score = request.data.get('score')

        if not score or not isinstance(score, int) or not (1 <= score <= 5):
            return Response({'error': 'Invalid score. Must be an integer between 1 and 5.'}, status=status.HTTP_400_BAD_REQUEST)

        rating, created = Rating.objects.update_or_create(
            user=user,
            story=story,
            defaults={'score': score}
        )
        
        return Response({'score': rating.score})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def liked(self, request):
        user = request.user
        liked_stories = user.liked_stories.all()
        serializer = self.get_serializer(liked_stories, many=True)
        return Response(serializer.data)
