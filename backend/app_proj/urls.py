"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
URL ROUTING
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
import rest_framework_simplejwt.views as JWT 

import business_module.views as BV
import members.views as MV


axios_url = [
    re_path(r'^theme-groups', BV.ThemeGroups),
    re_path(r'^set-names', BV.SetNames),
    re_path(r'^lego-form', BV.ProcessForm),
]

token_auth = [

    re_path(r'^obtain',    JWT.TokenObtainPairView.as_view()),
    re_path(r'^refresh',   JWT.TokenRefreshView.as_view()),

    re_path(r'^user',    MV.UserObtain ),


    #re_path(r'^register/', RegisterApi.as_view()),
]

urlpatterns = [
    re_path(r'^base-axios/', include((axios_url, 'axios_url'))),
    re_path(r'^auth/', include((token_auth, 'token_auth'))),

    #re_path(r'^api/auth-request', UserAPIView.as_view(), name='user'),
    re_path(r'^auth-dev/permission-required', MV.LoginDate),
]

