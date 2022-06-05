/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
import BaseAxios from './base-axios.js'
//import BaseAxios from '../page-routes/base-axios.js'

export const RoutesConfig = [
    {
        'title': 'Default',
        'path': '',
        'element': <BaseAxios />, // PR.BaseAxios,
        'order': 0,
    },    
    {
        'title': 'Base Axios',
        'path': '/base-axios',
        'element': null, // PR.BaseAxios,
        'order': 1,
    },
    // {
    //     title: 'Base Websocket',
    //     path: '/base-websocket',
    //     component: PR.BaseWebsocket,
    //     order: 2,
    // },
];

