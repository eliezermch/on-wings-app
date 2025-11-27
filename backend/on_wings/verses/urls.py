from django.urls import path
from .views import DailyVerseView

urlpatterns = [
    path('daily/', DailyVerseView.as_view(), name='daily-verse'),
]
