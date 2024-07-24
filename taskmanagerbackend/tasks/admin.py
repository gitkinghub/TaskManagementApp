# tasks/admin.py
from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'created_at', 'updated_at', 'completed', 'user')
    search_fields = ('title', 'description')
    list_filter = ('completed', 'created_at', 'updated_at')

admin.site.register(Task, TaskAdmin)
