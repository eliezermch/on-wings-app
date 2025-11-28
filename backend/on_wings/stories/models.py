from django.db import models
from django.conf import settings

class Story(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    reference = models.CharField(max_length=100)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_stories', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def average_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            return sum(r.score for r in ratings) / ratings.count()
        return 0

    def __str__(self):
        return self.title

class Rating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, related_name='ratings', on_delete=models.CASCADE)
    score = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'story')

    def __str__(self):
        return f"{self.user} rated {self.story} {self.score}"
