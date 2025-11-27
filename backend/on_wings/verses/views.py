from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import VerseGenerator
from .serializers import DailyVerseSerializer

class DailyVerseView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        generator = VerseGenerator()
        verse = generator.get_daily_verse()
        serializer = DailyVerseSerializer(verse)
        return Response(serializer.data, status=status.HTTP_200_OK)
