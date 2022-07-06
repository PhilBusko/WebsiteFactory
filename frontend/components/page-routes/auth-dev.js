/**************************************************************************************************
AUTH DEV
**************************************************************************************************/
import { useState, useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import AxiosConfig from '../app-main/axios-config'
import * as TK from '../app-main/token-storage'
import { GlobalContext } from '../app-main/global-store'
import PageLayout from '../layout/page-layout'
import * as ST from '../elements/styled-elements'


function AuthDev(props) {

    useEffect(() => {
        //console.log(tokenStore[0]);
    }, [])


    const { userStore } = useContext(GlobalContext);
    const [tokenError, setTokenError] = useState([]);    

    const handleLogIn = async (event) => {

        //const credentials = {'email': 'user.beta@website-factory.org', 'password': 'WF91cvbn'};
        const credentials = {'email': 'zetaszaur@gmail.com', 'password': 'GHIJ654'};
        console.log(credentials);
        TK.wipeTokens();

        AxiosConfig({
            method: 'POST',
            url: '/auth/click-login',
            //url: '/auth/obtain',
            data: credentials,
        }).then(responseData => {
            userStore[1](responseData.user || 'user not set')
            TK.storeAccessToken(responseData.access);
            TK.storeRefreshToken(responseData.refresh);
            setTokenError([]);
        }).catch(errorLs => {
            TK.wipeTokens();
            setTokenError(errorLs);
        });
    }

    const handleRefresh = (event) => {
        const refreshToken = TK.retrieveRefreshToken();

        if (!refreshToken) {
            setTokenError(['no refresh token']);
            return;
        }

        AxiosConfig({
            method: 'POST',
            url: '/auth/token-refresh',
            data: { 'refresh': refreshToken },
        }).then(responseData => {
            userStore[1](responseData.user);
            TK.storeAccessToken(responseData.access);
            setTokenError([]);
        }).catch(errorLs => {
            TK.wipeTokens();
            userStore[1](null);
            setTokenError(errorLs);
        });
    }

    const handleLogOut = (event) => {
        userStore[1](null);
        TK.wipeTokens();
        setTokenError([]);
    }


    const [requestMessage, setRequestMessage] = useState('');
    const [requestError, setRequestError] = useState([]);

    const handleNonAuth = (event) => {
        AxiosConfig({
            url: '/base-axios/theme-groups',
        }).then(responseData => {
            setRequestMessage(responseData);
            setRequestError([]);
        }).catch(errorLs => {
            setRequestMessage(null);
            setRequestError(errorLs);
       });
    }

    const handleAuthReq = (event) => {
        AxiosConfig({
            url: '/auth-dev/permission-required',
        }).then(responseData => {
            setRequestMessage(JSON.stringify(responseData));
            setRequestError([]);
        }).catch(errorLs => {
            userStore[1](null);
            setRequestMessage('');
            setRequestError(errorLs);
       });
    }


    const [featuresMessage, setFeaturesMessage] = useState('');
    const [featuresError, setFeaturesError] = useState([]);

    const handleRegister = (event) => {

        //const credentials = {'email': 'user.beta@website-factory.org', 'password': 'WF91cvbn'};
        const credentials = {'email': 'zetaszaur@gmail.com', 'password': 'GHIJ654'};
        //const credentials = {'email': 'phil.busko@gmail.com', 'password': 'GHIJ654'};

        AxiosConfig({
            method: 'POST',
            url: '/auth/register',
            data: credentials,
        }).then(responseData => {
            setFeaturesMessage(responseData);
            setFeaturesError([]);
        }).catch(errorLs => {
            setFeaturesMessage(null);
            setFeaturesError(errorLs);
        });
    }

    const handleForgotPass = (event) => {

        //const credentials = {'email': 'user.beta@website-factory.org', 'password': 'WF91cvbn'};
        const credentials = {'email': 'zetaszaur@gmail.com'};
        //const credentials = {'email': 'phil.busko@gmail.com', 'password': 'GHIJ654'};

        AxiosConfig({
            method: 'POST',
            url: '/auth/forgot-password',
            data: credentials,
        }).then(responseData => {
            setFeaturesMessage(responseData);
            setFeaturesError([]);
        }).catch(errorLs => {
            setFeaturesMessage(null);
            setFeaturesError(errorLs);
        });
    }


    return (
        <PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <ST.PageTitle>Auth Dev</ST.PageTitle>
                </Grid>

                <ST.GridItemVertical item xs={8} lg={4}>
                    
                    <ST.SpacedButton onClick={handleLogIn} variant='contained'>Log In</ST.SpacedButton>

                    <ST.SpacedButton onClick={handleRefresh} variant='contained'>Refresh</ST.SpacedButton>

                    <ST.SpacedButton onClick={handleLogOut} variant='contained'>Log Out</ST.SpacedButton>

                    <ST.SpacedLabel sx={{ 'color': 'crimson' }}>
                        { tokenError.map( (err, idx) => 
                            <div key={idx}>{err}</div>
                        )}
                    </ST.SpacedLabel>

                </ST.GridItemVertical>

                <ST.GridItemVertical item xs={8} lg={4} sx={{ 'height': '200px' }}>
                    
                    <ST.SpacedButton onClick={handleNonAuth} variant='contained'>Non Auth Request</ST.SpacedButton>

                    <ST.SpacedButton onClick={handleAuthReq} variant='contained'>Auth Request</ST.SpacedButton>

                    <ST.SpacedLabel >
                        { requestMessage }
                    </ST.SpacedLabel>

                    <ST.SpacedLabel sx={{ 'color': 'crimson' }}>
                        { requestError.map( (err, idx) => 
                            <div key={idx}>{err}</div>
                        )}
                    </ST.SpacedLabel>

                </ST.GridItemVertical>

                <ST.GridItemVertical item xs={8} lg={4}>
                    
                    <ST.SpacedButton onClick={handleRegister} variant='contained'>Register</ST.SpacedButton>

                    <ST.SpacedButton onClick={handleForgotPass} variant='contained'>Forgot Password</ST.SpacedButton>

                    <ST.SpacedLabel >
                        { featuresMessage }
                    </ST.SpacedLabel>

                    <ST.SpacedLabel sx={{ 'color': 'crimson' }}>
                        { featuresError.map( (err, idx) => 
                            <div key={idx}>{err}</div>
                        )}
                    </ST.SpacedLabel>

                </ST.GridItemVertical>

            </Grid>
        </PageLayout>
    );
}

export default AuthDev;
