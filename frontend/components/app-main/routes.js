/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
import BaseAxios from '../page-routes/base-axios'
import BaseWebsocket from '../page-routes/base-websocket'
import AuthDev from '../page-routes/auth-dev'
import ConfirmEmail from '../page-routes/confirm-email'
import NewPassword from '../page-routes/new-password'
import UserAccount from '../page-routes/user-account'

export const RoutesConfig = [
    {
        'title': 'Default',
        'path': '',
        'element': <BaseAxios />, 
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

    {
        'title': 'Confirm Email',
        'path': '/confirm-email/:userId/:token/',
        'element': <ConfirmEmail />, 
        'order': 1,
    },    
    {
        'title': 'Reset Password',
        'path': '/new-password/:userId/:token/',
        'element': <NewPassword />, 
        'order': 1,
    },    
    {
        'title': 'User Account',
        'path': '/account/',
        'element': <UserAccount />, 
        'order': 1,
    },    
];

