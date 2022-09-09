"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CUSTOM LOGIC
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import pandas as PD
import app_proj.database as DB
import app_proj.notebooks as NT


def GetThemeGroups():
    setsLs = DB.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    themeLs = list(setsDf['ThemeGroup'].unique())
    return themeLs

def GetSetNames():
    setsLs = DB.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    setLs = list(setsDf['Name'].unique())
    return setLs

def GetSetsByTheme(theme):
    setsLs = DB.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    setsDf = setsDf[ setsDf['ThemeGroup']==theme ]
    dropCols = ['ThemeGroup', 'Subtheme', 'PriceStore', 'PriceNew', 'PriceUsed']
    trimDf = setsDf.drop(dropCols, axis=1, errors='ignore')
    trimDf = trimDf.rename({'PieceCount': 'Pieces', 'MinifigCount': 'Minifigs'}, axis='columns')
    themeLs = NT.DataframeToDicts(trimDf)
    return themeLs

def GetSetInfo(setName):
    setsLs = DB.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    setsDf = setsDf[ setsDf['Name']==setName ]
    dropCols = ['id', 'ThemeGroup', 'PriceStore']
    trimDf = setsDf.drop(dropCols, axis=1, errors='ignore')
    trimDf = trimDf.rename({'PieceCount': 'Pieces', 'MinifigCount': 'Minifigs'}, axis='columns')
    setLs = NT.DataframeToDicts(trimDf)
    setDx = setLs[0]
    return setDx

