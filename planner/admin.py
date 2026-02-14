from django.contrib import admin
from .models import AgendaItem


@admin.register(AgendaItem)
class AgendaItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'category', 'completed', 'user')
    list_filter = ('completed', 'date', 'category')
    search_fields = ('title', 'description', 'user__username')
    date_hierarchy = 'date'
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Temel Bilgiler', {
            'fields': ('user', 'title', 'description', 'date', 'category')
        }),
        ('Durum', {
            'fields': ('completed',)
        }),
        ('Zaman Damgaları', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
