/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
//import * as PR from 'PagesIndex' //'../page-routes/_index.js'
import BaseAxios from '../page-routes/base-axios'
import BaseWebsocket from '../page-routes/base-websocket'
import AuthDev from '../page-routes/auth-dev'

export const RoutesConfig = [
    {
        'title': 'Default',
        'path': '',
        'element': <AuthDev />, 
        'order': 0,
    },    
    {
        'title': 'Base Axios',
        'path': '/base-axios/',
        'element': <BaseAxios />, 
        'order': 1,
    },
    {
        'title': 'Base Websocket',
        'path': '/base-websocket/',
        'element': <BaseWebsocket />, 
        'order': 2,
    },
    {
        'title': 'Auth Dev',
        'path': '/auth-dev/',
        'element': <AuthDev />, 
        'order': 3,
    },
];

