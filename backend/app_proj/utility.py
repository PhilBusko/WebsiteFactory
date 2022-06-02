"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
UTILITY
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import django.db as DB


def ConvertFigureToJson(figure):
    import json
    from plotly.utils import PlotlyJSONEncoder

    redata = json.loads(json.dumps(figure.data, cls=PlotlyJSONEncoder))
    relayout = json.loads(json.dumps(figure.layout, cls=PlotlyJSONEncoder))
    fig_json=json.dumps({'data': redata,'layout': relayout})

    return fig_json

class BaseManager(DB.models.Manager):
    def getOrNone(self, **kwargs):
        try:
            return self.get(**kwargs)
        except DB.models.ObjectDoesNotExist:
            return None

def GetTableCounts():
    from django.apps import apps

    customTables = []
    for name, app in apps.app_configs.items():
            
        if name in ['admin', 'auth', 'contenttypes', 'sessions']:
            continue

        modelLs = list(app.get_models())

        for m in modelLs:
            customTables.append({
                'Module': name,
                'Table': str(m).split('.')[-1].replace("'>", ""),
                'Count': m.objects.count(),
            })

    return customTables

def InsertSingle(module, table, entryDx):

    moduleObj = __import__(module)
    folderObj = getattr(moduleObj, 'models')
    classObj = getattr(folderObj, table)
    
    try:
        newModel = classObj(**entryDx)
        newModel.save()
        print('inserted')
    except Exception as ex:
        print(ex)

def InsertBulk(module, table, dataLs):

    moduleObj = __import__(module)
    folderObj = getattr(moduleObj, 'models')
    classObj = getattr(folderObj, table)
    
    for dx in dataLs:
        for k, v in dx.items():
            if str(v) in ['nan', 'NaT']:
                dx[k] = None

    try:
        modelLs = [classObj(**d) for d in dataLs]
        classObj.objects.bulk_create(modelLs, ignore_conflicts=True)
        print('bulk inserted')
    except Exception as ex:
        print(ex)

def GetTableDictionary(module, table):
    
    moduleObj = __import__(module)
    folderObj = getattr(moduleObj, 'models')
    classObj = getattr(folderObj, table)
    
    selectLs = list(classObj.objects.values())

    return selectLs

def GetRow(module, table, parameters):

    moduleObj = __import__(module)
    folderObj = getattr(moduleObj, 'models')
    classObj = getattr(folderObj, table)

    result = classObj.objects.getOrNone(**parameters)

    resultDx = {}
    if result: resultDx = result.__dict__
    return resultDx

def DeleteTable(module, table):

    moduleObj = __import__(module)
    folderObj = getattr(moduleObj, 'models')
    classObj = getattr(folderObj, table)

    classObj.objects.all().delete()
    print('table deleted')



