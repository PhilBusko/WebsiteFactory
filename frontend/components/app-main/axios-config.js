/**************************************************************************************************
AXIOS CONFIGURED
**************************************************************************************************/
import axios from 'axios';
import * as TK  from '../app-main/token-storage'


const onRequest = (config) => {
    const token = TK.retrieveAccessToken();
    if (token)
        config.headers['Authorization'] = `Bearer ${token}`;
    return config;
};

const onRequestError = (error) => {
    //console.log('onRequestError', error)
    return Promise.reject(error);
};

const onResponse = (response) => {
    //console.log('onResponse', response)
    return response.data;
};

const onResponseError = async (error) => {

    //console.log('onResponseError', error)

    // handle expired access token

    if (error.response.status === 401) {

        console.log('refresh trial');

        const refreshToken = TK.retrieveRefreshToken();
        const originalConfig = error.config;

        if (refreshToken && !originalConfig._retry) {

            originalConfig._retry = true;
            //console.log('refresh token found');
            //console.log(originalConfig);

            AxiosConfig({
                method: 'POST',
                url: '/auth/refresh',
                data: { 'refresh': refreshToken },
            }).then(responseData => {
                //console.log('trial responseData', responseData);
                TK.storeAccessToken(responseData.access);
                // have to make original call ?
            }).catch(errorLs => {
                console.log(errorLs);
                TK.wipeTokens();
            });

            // not able to hook up the original call
            return
        }
    }

    // handle generic error

    var errorLs = [error.message];
    if (typeof error.response?.statusText != 'undefined') 
        errorLs.push(error.response.statusText);
    if (typeof error.response?.data?.detail != 'undefined') 
        errorLs.push(error.response.data.detail);

    return Promise.reject(errorLs);
};



const AxiosConfig = axios.create({
    baseURL: (process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://website-factory.herokuapp.com/'),
    headers: {'Content-Type': 'application/json'},
});

AxiosConfig.interceptors.request.use(onRequest, onRequestError);
AxiosConfig.interceptors.response.use(onResponse, onResponseError);

export default AxiosConfig;

