from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, UserQuizProgressViewSet

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'progress', UserQuizProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]
