"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
HTTP URLS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
import members.views as MV
import business_module.views as BV
import central.views as CV


central_url = [
    re_path(r'^user-account', CV.UserAccount), 
]

axios_url = [
    re_path(r'^lego-form', BV.ProcessForm),
    re_path(r'^theme-groups', BV.ThemeGroups),
    re_path(r'^sets-by-theme/(?P<theme>.+)', BV.SetsByTheme),

    re_path(r'^set-names', BV.SetNames),
    re_path(r'^set-info/(?P<setName>.+)', BV.SetInfo),
]

auth_url = [
    re_path(r'^click-login',    MV.ClickLogin ),
    re_path(r'^token-refresh',  MV.TokenRefresh ),
    re_path(r'^create-user',    MV.CreateUser ),
    re_path(r'^send-verification',  MV.SendVerification ),
    re_path(r'^verify-registration', MV.VerifyRegistration), 
    re_path(r'^forgot-password', MV.ForgotPassword), 
    re_path(r'^reset-password', MV.ResetPassword), 
]

urlpatterns = [
    re_path(r'^base-axios/', include((axios_url, 'axios_url'))),
    re_path(r'^central/', include((central_url, 'central_url'))),

    re_path(r'^auth/', include((auth_url, 'auth_url'))),
    re_path(r'^auth-dev/permission-required', MV.LoginDate),
]

