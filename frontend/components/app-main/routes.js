/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
//import * as PR from 'PagesIndex' //'../page-routes/_index.js'
import BaseAxios from '../page-routes/base-axios.js'
import BaseWebsocket from '../page-routes/base-websocket.js'
import Admin from '../page-routes/admin.js'

export const RoutesConfig = [
    {
        'title': 'Default',
        'path': '',
        'element': <BaseAxios />, 
        'order': 0,
    },    
    {
        'title': 'Base Axios',
        'path': '/base-axios',
        'element': <BaseAxios />, 
        'order': 1,
    },
    {
        'title': 'Base Websocket',
        'path': '/base-websocket',
        'element': <BaseWebsocket />, 
        'order': 2,
    },
    {
        'title': 'Admin',
        'path': '/admin',
        'element': <Admin />, 
        'order': 3,
    },
];

