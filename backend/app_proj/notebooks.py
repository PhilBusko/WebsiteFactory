"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
NOTEBOOK UTILITIES
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

NOTEBOOK_ENV = 'dev'  # 'production'

def ConvertFigureToJson(figure):
    import json
    from plotly.utils import PlotlyJSONEncoder

    redata = json.loads(json.dumps(figure.data, cls=PlotlyJSONEncoder))
    relayout = json.loads(json.dumps(figure.layout, cls=PlotlyJSONEncoder))
    fig_json=json.dumps({'data': redata,'layout': relayout})

    return fig_json

