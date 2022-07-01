"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
MEMBERS VIEWS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response 
from rest_framework import status

import rest_framework_simplejwt.serializers as SR
import rest_framework_simplejwt.tokens as TK 


@api_view(['POST'])
def ClickLogin(request):

    # check credentials and status 

    reqEmail = request.data.get('email') 
    reqPass = request.data.get('password')  

    userMd = get_user_model().objects.getUser(email=reqEmail)
    if not userMd:
        return Response({'detail': 'Credentials not found'}, status=status.HTTP_404_NOT_FOUND)

    checkPass = userMd.check_password(reqPass)
    if not checkPass:
        return Response({'detail': 'Credentials not found'}, status=status.HTTP_404_NOT_FOUND)

    if not userMd.verified:
        return Response({'detail': 'User not verified'}, status=status.HTTP_403_FORBIDDEN)

    if not userMd.active:
        return Response({'detail': 'User is inactive'}, status=status.HTTP_403_FORBIDDEN)

    # generate tokens 

    tokenMaker = TK.RefreshToken()
    token = tokenMaker.for_user(userMd)

    return Response({
        'user': userMd.user_name, 
        'access': str(token.access_token), 
        'refresh': str(token), 
    })


@api_view(['POST'])
def TokenRefresh(request):

    # get the new access token

    refreshToken = request.data.get('refresh') 

    try:
        serializer = SR.TokenRefreshSerializer(data={'refresh': refreshToken})
        serializer.is_valid()
        accessToken = serializer.validated_data['access']
    except Exception as ex:
        return Response({'detail': 'Refresh serializer error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # get user model

    import jwt
    from app_proj.settings import SIMPLE_JWT
    refreshDx = jwt.decode(refreshToken, SIMPLE_JWT['SIGNING_KEY'], algorithms=[SIMPLE_JWT['ALGORITHM']])

    userMd = get_user_model().objects.getUser(id=refreshDx['user_id'])
    if not userMd:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({
        'user': userMd.user_name, 
        'access': accessToken, 
        'refresh': None, 
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def LoginDate(request):

    #print('LoginDate', request.user.user_name)

    try:
        userMd = list(get_user_model().objects.filter(user_name=request.user.user_name).values())
        #print(userMd)
    except Exception as ex:
        userMd = [{'date_joined': 'no user'}]
        print(ex)

    import datetime
    myDate = datetime.datetime.now()
    
    return Response({'date' : myDate})

