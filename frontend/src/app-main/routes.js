/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
//import * as PR from '../page-routes/_index.js'
import BaseAxios from './base-axios.js'

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

