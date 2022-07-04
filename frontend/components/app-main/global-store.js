/**************************************************************************************************
GLOBAL STORE
**************************************************************************************************/
import { useState, useEffect, createContext } from 'react';
import * as TK from '../app-main/token-storage'
import AxiosConfig from '../app-main/axios-config'


const GlobalContext = createContext(null);

function GlobalProvider(props) {

    // global state

    const [user, setUser] = useState(null);
    const store = {
        userStore: [user, setUser],
    }

    // onload for the app 

    function tryLogin() {

        // log in the user if a refresh token is found 
    
        const refreshToken = TK.retrieveRefreshToken();
    
        if (!refreshToken) {
            console.log('onload: no refresh token');
            return;
        }
    
        AxiosConfig({
            method: 'POST',
            url: '/auth/token-refresh',
            data: { 'refresh': refreshToken },
        }).then(responseData => {
            setUser(responseData.user);
            TK.storeAccessToken(responseData.access);
        }).catch(errorLs => {
            TK.wipeTokens();
            setUser(null);
            console.log(errorLs);
        });
    }
    
    useEffect(() => {
        tryLogin();
    }, [])

    // global provider render

    return (
        <GlobalContext.Provider value={store}>
            { props.children }
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider }
