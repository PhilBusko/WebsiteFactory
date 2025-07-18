/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
import HttpPage from '../page-routes/http-page';
import WebsocketPage from '../page-routes/websocket-page';
import AuthDev from '../page-routes/auth-dev';
import VerifyEmail from '../page-routes/verify-email';
import NewPassword from '../page-routes/new-password';
import UserAccount from '../page-routes/user-account';
import GalleryPage from '../page-routes/gallery-page';


export const RoutesConfig = [
    {
        'title': 'Default',
        'path': '',
        'element': <HttpPage />, 
        'order': 0,
    },    
    {
        'title': 'Http Page',
        'path': '/http-page/',
        'element': <HttpPage />, 
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
    {
        'title': 'Gallery',
        'path': '/gallery/',
        'element': <GalleryPage />, 
        'order': 1,
    },    
];

