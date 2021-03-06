"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
URL ROUTING
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
import members.views as MV
import business_module.views as BV


authentication = [
    re_path(r'^click-login',    MV.ClickLogin ),
    re_path(r'^token-refresh',  MV.TokenRefresh ),
    re_path(r'^register',  MV.RegisterUser ),
    re_path(r'^confirm-registration', MV.ConfirmRegistration), 
    re_path(r'^forgot-password', MV.ForgotPassword), 
    re_path(r'^reset-password', MV.ResetPassword), 
    re_path(r'^user-account', MV.UserAccount), 
]

axios_url = [
    re_path(r'^theme-groups', BV.ThemeGroups),
    re_path(r'^set-names', BV.SetNames),
    re_path(r'^lego-form', BV.ProcessForm),
    re_path(r'^lego-params/(?P<theme>\w{0,30})', BV.LegoParams),
]

urlpatterns = [
    re_path(r'^auth/', include((authentication, 'authentication'))),
    re_path(r'^base-axios/', include((axios_url, 'axios_url'))),
    re_path(r'^auth-dev/permission-required', MV.LoginDate),
]

