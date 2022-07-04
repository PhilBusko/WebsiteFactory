"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
LEGO MODELS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import django.db.models as MD
import app_proj.database as DB


class LegoSet(MD.Model):
    SetNo = MD.TextField(unique=True)
    Name = MD.TextField()
    Year = MD.IntegerField()

    ThemeGroup = MD.TextField(null=True)
    Theme = MD.TextField(null=True)
    Subtheme = MD.TextField(null=True)
    PriceStore = MD.FloatField(null=True)
    PriceNew = MD.FloatField(null=True)
    PriceUsed = MD.FloatField(null=True)
    PieceCount = MD.IntegerField(null=True)
    MinifigCount = MD.IntegerField(null=True)

    objects = DB.BaseManager()

    """
    FieldFK = MD.ForeignKey(LegoSet, on_delete=MD.CASCADE) 
    class Meta:
        unique_together = ('ColumnOne', 'ColumnTwo')
    """

