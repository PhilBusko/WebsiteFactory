"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CENTRAL MODELS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import django.db.models as JM
import app_proj.database as DB
import members.models as BM 


class UserProfile(JM.Model):

    UserFK = JM.OneToOneField(BM.User, on_delete=JM.CASCADE) 
    FavoriteSet = JM.TextField(null=True)

    objects = DB.BaseManager()



