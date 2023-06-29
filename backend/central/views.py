"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CENTRAL VIEWS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import central.models as CM 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserAccount(request):

    query = CM.UserProfile.objects.filter(UserFK=request.user)
    if query.count() == 0:
        createMd = CM.UserProfile(UserFK=request.user)
        createMd.save()
        profileData = 'created profile'
    else:
        profileData = 'existing profile'

    userDx = {
        'Name': request.user.user_name,
        'Email': request.user.email,
        'Unique Id': request.user.unique_id,
        'Date Joined': request.user.date_joined.strftime('%Y-%b-%d'), 
        'Admin': 'Yes' if request.user.is_superuser else 'No',
    }
    return Response(userDx)

