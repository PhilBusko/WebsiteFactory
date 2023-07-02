/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
import AxiosPage from '../page-routes/axios-page';
import WebsocketPage from '../page-routes/websocket-page';
import AuthDev from '../page-routes/auth-dev';
import VerifyEmail from '../page-routes/verify-email';
import NewPassword from '../page-routes/new-password';
import UserAccount from '../page-routes/user-account';


export const RoutesConfig = [
    {
        'title': 'Default',
        'path': '',
        'element': <AxiosPage />, 
        'order': 0,
    },    
    {
        'title': 'Axios Page',
        'path': '/axios-page/',
        'element': <AxiosPage />, 
        'order': 1,
    },
    {
        'title': 'Websocket Page',
        'path': '/websocket-page/',
        'element': <WebsocketPage />, 
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

