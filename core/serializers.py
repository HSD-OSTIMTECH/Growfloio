from rest_framework import serializers
from .models import Category, Experience, Like
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    experience_count = serializers.IntegerField(read_only=True)
    total_likes = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'code', 'name', 'description', 'icon_name', 'color_hint', 'experience_count', 'total_likes']

class ExperienceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = ['id', 'category', 'user', 'title', 'resources', 'notes', 'grade', 'likes_count', 'is_liked', 'created_at']

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return Like.objects.filter(experience=obj, user=user).exists()
        return False
