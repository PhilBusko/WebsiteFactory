"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
APP RULES
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
import business_module.views as BV


axios_url = [
    re_path(r'^dummy/', BV.Dummy),
    re_path(r'^theme-groups/', BV.ThemeGroups),
]

urlpatterns = [
   re_path(r'^base-axios/', include((axios_url, 'module'))),
]

