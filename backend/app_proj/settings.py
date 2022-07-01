"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
DJANGO SETTINGS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from pathlib import Path
BACKEND_PATH = Path(__file__).resolve().parent.parent

import os
DEPLOYMENT_ENV = os.environ.get('DEPLOYMENT_ENV', 'dev')
print('ENV:', DEPLOYMENT_ENV)


# APPLICATION

INSTALLED_APPS = [
    # django base
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # installed packages
	'rest_framework',
    'corsheaders',
    'django_extensions',
    # custom modules
    'members', 
    'business_module',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # installed packages
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'app_proj.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BACKEND_PATH, 'members', 'data')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# SERVER

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'website-factory.herokuapp.com']
CORS_ORIGIN_WHITELIST = ['http://localhost:3000', 'https://websitefactory.vercel.app']
DEBUG = False if DEPLOYMENT_ENV == 'dev' else True

STATIC_URL = 'static/'
STATIC_ROOT = 'app_proj.static'


# DATABASE

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BACKEND_PATH / 'app_db.sqlite3',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# REST AUTH API

SECRET_KEY = '2q1c&ABCDa%6nrvl&6g=awbWXYZg2$qlho#JKLv!ji98'

AUTH_USER_MODEL = 'members.User'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework_simplejwt.authentication.JWTAuthentication',],
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'UPDATE_LAST_LOGIN': True,
    'SIGNING_KEY': SECRET_KEY,
    'ALGORITHM': 'HS256',
}


# EMAIL

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER='zetaszaur@gmail.com'
EMAIL_HOST_PASSWORD='jnvrrykxnlnrmpmp' 
EMAIL_PORT = 587
#PASSWORD_RESET_TIMEOUT_DAYS = 2


# Internationalization

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

