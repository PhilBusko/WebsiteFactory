"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
LEGO VIEWS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from rest_framework.decorators import api_view
from rest_framework.response import Response
import business_module.logic.custom as CT 


@api_view(['GET'])
def ThemeGroups(request):
    themeLs = CT.GetThemeGroups()
    return Response(themeLs)


