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

    import datetime
    myDate = datetime.datetime.now()
    
    return Response({'date' : myDate})




# CUSTOMIZE JWT VIEWS

@api_view(['POST'])
def UserObtain(request):
    # not able to get user info from rest_simplejwt, so using this call instead

    import jwt
    from app_proj.settings import SIMPLE_JWT
    tokenDx = request.data
    accessToken = tokenDx['access']
    accessDx = jwt.decode(accessToken, SIMPLE_JWT['SIGNING_KEY'], algorithms=[SIMPLE_JWT['ALGORITHM']])

    # can also log the user into django here

    try:
        userMd = get_user_model().objects.filter(id=accessDx['user_id']).values()
        userDx = list(userMd)[0]
    except Exception as ex:
        print(ex)

    return Response(userDx['username'])





