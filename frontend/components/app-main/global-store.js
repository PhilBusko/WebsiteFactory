/**************************************************************************************************
GLOBAL STORE
**************************************************************************************************/
import { useState, useEffect, createContext } from 'react';

import * as TK from '../app-main/token-storage'
import AxiosConfig from '../app-main/axios-config'


const GlobalContext = createContext(null);

function GlobalProvider(props) {

    const [user, setUser] = useState(null);
    const store = {
        userStore: [user, setUser],
    }

    useEffect(() => {

        // log in the user if a refresh token is found 

        const refreshToken = TK.retrieveRefreshToken();
        if (refreshToken) {
            AxiosConfig({
                method: 'POST',
                url: '/auth/refresh',
                data: { 'refresh': refreshToken },
            }).then(responseData => {
                TK.storeAccessToken(responseData.access);

                AxiosConfig({
                    method: 'POST',
                    url: '/auth/user',
                    data: responseData,
                }).then(responseData2 => {
                    setUser(responseData2);
                }).catch(errorLs => {
                    console.log(errorLs);
                });

            }).catch(errorLs => {
                console.log(errorLs)
            });
        }
    }, [])

    return (
        <GlobalContext.Provider value={store}>
            { props.children }
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider }
