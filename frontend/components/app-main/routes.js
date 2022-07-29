/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
import BaseAxios from '../page-routes/base-axios'
import BaseWebsocket from '../page-routes/base-websocket'
import AuthDev from '../page-routes/auth-dev'
import VerifyEmail from '../page-routes/verify-email'
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
        'title': 'Verify Email',
        'path': '/verify-email/:userId/:token/',
        'element': <VerifyEmail />, 
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

