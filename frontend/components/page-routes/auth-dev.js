/**************************************************************************************************
AUTH DEV
**************************************************************************************************/
import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import AxiosConfig from '../app-main/axios-config'
import * as TK from '../app-main/token-storage'
import { GlobalContext } from '../app-main/global-store'
import PageLayout from '../layout/page-layout'
import * as ST from '../layout/styled-elements'


const SpacedButton = styled(Button)(({ theme }) => ({
    'margin': '10px 0px',
}));

const SpacedLabel = styled('div')(({ theme }) => ({
    'margin': '10px 0px',
}));


function AuthDev(props) {

    const { userStore } = useContext(GlobalContext);

    const [tokenError, setTokenError] = useState([]);
    const [requestMessage, setRequestMessage] = useState('');
    const [requestError, setRequestError] = useState([]);
    

    useEffect(() => {
        //console.log(tokenStore[0]);
    }, [])



    const handleRegister = (event) => {

        const credentials = {};
        
        AxiosConfig({
            method: 'POST',
            url: '/auth/register',
            //data: JSON.stringify(credentials),
        }).then(success => {
            console.log(success);

        }).catch( error => {

            if (!!error.response.data) {
                setTokenError(error.response.data.detail);
            }
            else if (!!error.message) {
                setTokenError(error.message);
            }

        })
    }




    const handleLogIn = async (event) => {

        const credentials = {'username': 'frontend', 'password': 'WF91cvbn'};
        console.log(credentials);

        AxiosConfig({
            method: 'POST',
            url: '/auth/obtain',
            data: credentials,
        }).then(responseData => {
            //userStore[1](success.data.access)
            TK.storeAccessToken(responseData.access);
            TK.storeRefreshToken(responseData.refresh);
            setTokenError([]);

            AxiosConfig({
                method: 'POST',
                url: '/auth/user',
                data: responseData,
            }).then(responseData2 => {
                userStore[1](responseData2);
            }).catch(errorLs => {
                setTokenError(errorLs);
            });

        }).catch(errorLs => {
            TK.wipeTokens();
            setTokenError(errorLs);
        });
    }

    const handleRefresh = (event) => {
        const refreshToken = TK.retrieveRefreshToken();

        AxiosConfig({
            method: 'POST',
            url: '/auth/refresh',
            data: { 'refresh': refreshToken },
        }).then(responseData => {
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
    }

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
            setRequestMessage('');
            setRequestError(errorLs);
       });
    }

    




    return (
        <PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <ST.PageTitle>Auth Dev</ST.PageTitle>
                </Grid>

                <ST.GridPanel item xs={8} lg={4} 
                    sx={{ 'justifyContent': 'space-between', 'flexDirection': 'column' }}>
                    
                    <SpacedButton onClick={handleLogIn} variant='contained'>Log In</SpacedButton>

                    <SpacedButton onClick={handleRefresh} variant='contained'>Refresh</SpacedButton>

                    <SpacedButton onClick={handleLogOut} variant='contained'>Log Out</SpacedButton>

                    <SpacedLabel sx={{ 'width': '300px', 'overflowWrap': 'break-word' }}>
                        { 'token' }
                    </SpacedLabel>
                    <SpacedLabel sx={{ 'width': '300px', 'overflowWrap': 'break-word' }}>
                        { 'token' }
                    </SpacedLabel>

                    <SpacedLabel sx={{ 'color': 'crimson' }}>
                        { tokenError.map( (err, idx) => 
                            <div key={idx}>{err}</div>
                        )}
                    </SpacedLabel>

                </ST.GridPanel>

                <ST.GridPanel item xs={8} lg={4} 
                    sx={{ 'justifyContent': 'space-between', 'flexDirection': 'column', 'height': '200px' }}>
                    
                    <SpacedButton onClick={handleNonAuth} variant='contained'>Non Auth Request</SpacedButton>

                    <SpacedButton onClick={handleAuthReq} variant='contained'>Auth Request</SpacedButton>

                    <SpacedLabel >
                        { requestMessage }
                    </SpacedLabel>

                    <SpacedLabel sx={{ 'color': 'crimson' }}>
                        { requestError.map( (err, idx) => 
                            <div key={idx}>{err}</div>
                        )}
                    </SpacedLabel>

                </ST.GridPanel>

                <ST.GridPanel item xs={8} lg={4} 
                    sx={{ 'justifyContent': 'space-between', 'flexDirection': 'column' }}>
                    
                    <SpacedButton onClick={handleLogIn} variant='contained'>Register</SpacedButton>

                </ST.GridPanel>

            </Grid>
        </PageLayout>
    );
}

export default AuthDev;
