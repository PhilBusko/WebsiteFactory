"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
APP RULES
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.urls import include, re_path
import business_module.views as BV

axios_url = [
    re_path(r'^theme-groups/', BV.ThemeGroups),
    re_path(r'^set-names/', BV.SetNames),
    re_path(r'^lego-form/', BV.ProcessForm),
]

urlpatterns = [
   re_path(r'^base-axios/', include((axios_url, 'module'))),
]

