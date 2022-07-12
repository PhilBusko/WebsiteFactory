/**************************************************************************************************
AUTH DEV
**************************************************************************************************/
import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { Grid, Stack } from '@mui/material';
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


    const [requestMessage, setRequestMessage] = useState('default message');
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
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>Auth Dev</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={8} lg={4}>
                    <Stack spacing='16px' alignItems='center'>
                    
                        <Button onClick={handleLogIn} variant='contained'>Log In</Button>

                        <Button onClick={handleRefresh} variant='contained'>Refresh</Button>

                        <Button onClick={handleLogOut} variant='contained'>Log Out</Button>

                        <ST.BaseText sx={{ 'color': 'crimson' }}>
                            { tokenError.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </ST.BaseText>
                    
                    </Stack>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={8} lg={4}>
                    <Stack spacing='16px' alignItems='center'>

                        <Button onClick={handleNonAuth} variant='contained'>Non Auth Request</Button>

                        <Button onClick={handleAuthReq} variant='contained'>Auth Request</Button>

                        <ST.BaseText>{ requestMessage }</ST.BaseText>

                        <ST.BaseText sx={{ 'color': 'crimson' }}>
                            { requestError.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </ST.BaseText>

                    </Stack>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={8} lg={4} >
                    <Stack spacing='16px' alignItems='center'>
                    
                        <Button onClick={handleRegister} variant='contained'>Register</Button>

                        <Button onClick={handleForgotPass} variant='contained'>Forgot Password</Button>

                        <ST.BaseText>{ featuresMessage }</ST.BaseText>

                        <ST.BaseText sx={{ 'color': 'crimson' }}>
                            { featuresError.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </ST.BaseText>

                    </Stack>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default AuthDev;
