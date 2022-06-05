"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
LEGO VIEWS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from rest_framework.decorators import api_view
from rest_framework.response import Response
import business_module.logic.custom as CT 

# put request to send data from client
@api_view(['PUT'])
def Dummy(request):
    print('dummy view', request.user, request.data)

    inputVal = int(request.data.get('inputVal'))
    resultsDx = { 'dummyVal': inputVal+10 }

    return Response(resultsDx)


@api_view(['GET'])
def ThemeGroups(request):
    themeLs = CT.GetThemeGroups()
    return Response(themeLs)


