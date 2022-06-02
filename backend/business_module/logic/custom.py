"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CUSTOM LOGIC
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import pandas as PD
import app_proj.utility as UT


def GetThemeGroups():
    setsLs = UT.GetTableDictionary('business_module', 'LegoSet')
    setsDf = PD.DataFrame(setsLs)
    themeLs = list(setsDf['ThemeGroup'].unique())
    return themeLs



