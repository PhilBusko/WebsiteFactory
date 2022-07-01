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
    re_path(r'^click-login',    MV.ClickLogin ),
    re_path(r'^token-refresh',  MV.TokenRefresh ),

    # re_path(r'^obtain',    JWT.TokenObtainPairView.as_view()),
    # re_path(r'^refresh',   JWT.TokenRefreshView.as_view()),
]

urlpatterns = [
    re_path(r'^base-axios/', include((axios_url, 'axios_url'))),
    re_path(r'^auth/', include((token_auth, 'token_auth'))),

    re_path(r'^auth-dev/permission-required', MV.LoginDate),
]

