from django.db import models

class DailyVerse(models.Model):
    date = models.DateField(unique=True)
    content = models.TextField()
    content_es = models.TextField(default='')
    reference = models.CharField(max_length=100)
    reference_es = models.CharField(max_length=100, default='')
    version = models.CharField(max_length=20, default='NIV')
    version_es = models.CharField(max_length=20, default='RVR1960')
    theme = models.CharField(max_length=100, blank=True, null=True)
    theme_es = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reference} ({self.date})"
