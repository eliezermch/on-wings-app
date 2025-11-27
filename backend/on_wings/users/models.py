from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    avatar_url = models.URLField(max_length=500, null=True, blank=True)

    @property
    def profile_image(self):
        if self.avatar:
            return self.avatar.url
        return self.avatar_url
