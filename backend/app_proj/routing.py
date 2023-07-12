"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
WEBSOCKET ROUTING
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
import business_module.consumers as BC


websocket_urls = [
    re_path(r'ws-connect/$', BC.SampleConsumer.as_asgi()),
    # re_path(r'ws-connect/(?P<token>[\w\.-]+)/$', BC.SampleConsumer.as_asgi()),
]

