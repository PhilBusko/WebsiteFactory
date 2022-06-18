"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
URL ROUTING
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

import business_module.views as BV
from members.views import UserAPIView


axios_url = [
    re_path(r'^theme-groups/', BV.ThemeGroups),
    re_path(r'^set-names/', BV.SetNames),
    re_path(r'^lego-form/', BV.ProcessForm),
]

token_auth = [
    re_path(r'', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = [
   re_path(r'^base-axios/', include((axios_url, 'axios_url'))),
   re_path(r'^api/token/', include((token_auth, 'token_auth'))),
   re_path(r'^api/user/', UserAPIView.as_view(), name='user'),
]

