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

@api_view(['GET'])
def SetNames(request):
    setLs = CT.GetSetNames()
    return Response(setLs)

# post request to send data from client
@api_view(['POST'])
def ProcessForm(request):
    print('ProcessForm', request.user, request.data)
    resultsDx = { 'message': 'Form accepted by server' }
    return Response(resultsDx)

@api_view(['GET'])
def LegoParams(request, theme):
    print(theme)
    resultsDx = { 'theme': theme }
    return Response(resultsDx)

