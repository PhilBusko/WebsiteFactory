"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
LEGO MODELS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import django.db as DB
import app_proj.utility as UT


class LegoSet(DB.models.Model):
    SetNo = DB.models.TextField(unique=True)
    Name = DB.models.TextField()
    Year = DB.models.IntegerField()

    ThemeGroup = DB.models.TextField(null=True)
    Theme = DB.models.TextField(null=True)
    Subtheme = DB.models.TextField(null=True)
    PriceStore = DB.models.FloatField(null=True)
    PriceNew = DB.models.FloatField(null=True)
    PriceUsed = DB.models.FloatField(null=True)
    PieceCount = DB.models.IntegerField(null=True)
    MinifigCount = DB.models.IntegerField(null=True)

    objects = UT.BaseManager()

    """
    FieldFK = DB.models.ForeignKey(LegoSet, on_delete=DB.models.CASCADE) 
    class Meta:
        unique_together = ('ColumnOne', 'ColumnTwo')
    """


