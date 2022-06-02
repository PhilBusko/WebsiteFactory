"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
SERVER HOOKS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os
from django.core.wsgi import get_wsgi_application
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app_proj.settings')

asgi_app = get_asgi_application()

wsgi_app = get_wsgi_application()

