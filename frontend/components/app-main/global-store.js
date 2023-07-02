/**************************************************************************************************
GLOBAL STORE
**************************************************************************************************/
import { useState, useEffect, createContext } from 'react';
import * as TK from '../app-main/token-storage';
import AxiosConfig from '../app-main/axios-config';


const GlobalContext = createContext(null);

function GlobalProvider(props) {

    // global state

    const [userDx, setUserDx] = useState({'name': '', 'status': 'initial'});    // initial, guest, user, admin
    const [navOpen, setNavOpen] = useState(true);
    const store = {
        userStore: [userDx, setUserDx],
        navStore: [navOpen, setNavOpen],
    }

    // onload for the app 

    function tryLogin() {

        // log in the user if a refresh token is found 

        const refreshToken = TK.retrieveRefreshToken();
    
        if (!refreshToken) {
            console.log('onload: no refresh token');
            const newUser = {'name': '', 'status': 'guest',}
            setUserDx(newUser);
            return;
        }

        console.log('start login from refresh')
        AxiosConfig({
            method: 'POST',
            url: '/auth/token-refresh',
            data: { 'refresh': refreshToken },
        }).then(responseData => {
            const newUser = {
                'name': responseData.user,
                'status': responseData.admin ? 'admin' : 'user',
            }
            setUserDx(newUser);
            TK.storeAccessToken(responseData.access);
            //console.log('end login from refresh')
        }).catch(errorLs => {
            TK.wipeTokens();
            const newUser = {'name': '', 'status': 'guest',}
            setUserDx(newUser);
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
