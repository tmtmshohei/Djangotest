from django.db import models
from django.utils import timezone

# Create your models here.
class Position(models.Model):
    ptz_p = models.IntegerField(default=0)
    ptz_t = models.IntegerField(default=0)
    ptz_z = models.IntegerField(default=0)
    Time = models.TextField(default=0)
    DateTime = models.DateTimeField(default=timezone.now)
