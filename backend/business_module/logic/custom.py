"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CUSTOM LOGIC
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import pandas as PD
import app_proj.database as DH


def GetThemeGroups():
    setsLs = DH.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    themeLs = list(setsDf['ThemeGroup'].unique())
    return themeLs

def GetSetNames():
    setsLs = DH.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    setLs = list(setsDf['Name'].unique())
    return setLs


