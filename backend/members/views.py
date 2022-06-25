"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
MEMBERS VIEWS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth import get_user_model


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def LoginDate(request):

    print('LoginDate', request.user.username)

    if request.user.username:
        userMd = list(get_user_model().objects.filter(username=request.user.username).values())
        #print(userMd)

    else:
        userMd = [{'date_joined': 'no user'}]
    
    return Response({'date' : userMd[0]['date_joined']})



