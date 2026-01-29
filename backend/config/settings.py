"""
Django settings - Growfolio backend (React SPA + Bootstrap, Django uyumlu).
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
# React build çıktısı (proje kökündeki build/ klasörü)
REACT_BUILD_DIR = BASE_DIR.parent / 'build'

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'dev-key-degistirin-production-da')
DEBUG = os.environ.get('DJANGO_DEBUG', '1') == '1'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'frontend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [REACT_BUILD_DIR],
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': [],
        },
    },
]

# Static: React build çıktısı - /assets/* build/assets/* ile eşleşir (Vite varsayılan çıktı)
STATIC_URL = '/assets/'
STATICFILES_DIRS = [REACT_BUILD_DIR / 'assets'] if (REACT_BUILD_DIR / 'assets').exists() else []
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Güvenlik (production için)
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
