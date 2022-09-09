"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
NOTEBOOK UTILITIES
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

NOTEBOOK_ENV = 'dev'  # 'production'

def DataframeToDicts(myDf):
    myLs = myDf.to_dict('records')
    for nd, d in enumerate(myLs):
        for k, v in d.items():
            if str(v) in ['nan', 'NaT', '<NA>'] : d[k] = None
    return myLs

def ConvertFigureToJson(figure):
    import json
    from plotly.utils import PlotlyJSONEncoder

    redata = json.loads(json.dumps(figure.data, cls=PlotlyJSONEncoder))
    relayout = json.loads(json.dumps(figure.layout, cls=PlotlyJSONEncoder))
    fig_json=json.dumps({'data': redata,'layout': relayout})

    return fig_json

