"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CENTRAL LOGIC
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import json
import pandas as PD
import business_module.models as BM 
import central.models as CM 

from django.db import connection
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [ dict(zip(columns, row)) for row in cursor.fetchall() ]


def GetData():
    command = """
        SELECT *
        FROM business_module_LegoSet as LS 
    """
    cursor = connection.cursor()
    result = cursor.execute(command)
    masterLs = dictfetchall(cursor)
    result = cursor.close()

    return masterLs

