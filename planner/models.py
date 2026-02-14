from django.db import models
from django.contrib.auth.models import User


class AgendaItem(models.Model):
    """Model for agenda items/tasks"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='agenda_items')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    category = models.CharField(max_length=50, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', 'title']
        verbose_name_plural = 'Agenda Items'

    def __str__(self):
        return f"{self.title} - {self.date}"
