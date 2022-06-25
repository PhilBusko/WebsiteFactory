/**************************************************************************************************
PAGE
**************************************************************************************************/
import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import { GlobalContext } from '../app-main/global-store'
import * as AUTH from '../app-main/authentication'
import PageLayout from '../layout/page-layout'
import * as ST from '../layout/styled-elements'


const SpacedButton = styled(Button)(({ theme }) => ({
    'margin': '10px 0px',
}));

const SpacedLabel = styled('div')(({ theme }) => ({
    'margin': '10px 0px',
}));


function Admin(props) {

    const { tokenStore } = React.useContext(GlobalContext);

    const [tokenError, setTokenError] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    const [requestError, setRequestError] = useState('');
    
    React.useEffect(() => {
        //console.log(tokenStore[0]);
    }, [])


    const handleRegister = (event) => {

        const credentials = {};
        
        axios(AUTH.registerConfig
        ).then(success => {
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

        try {
            const tokens = await AUTH.loginUser(credentials);
            tokenStore[1](tokens.access)

        } catch (error) {
            console.log(error.message);

            if (!!error.response.data) {
                setTokenError(error.response.data.detail);
            }
            else if (!!error.message) {
                setTokenError(error.message);
            }
        }
    }

    const handleNonAuth = (event) => {
        axios({
            url: `http://localhost:8000/base-axios/theme-groups`,
            headers: {'Content-Type': 'application/json'},
        }).then(success => {
            setRequestMessage(success.data);
            setRequestError(null);
        }).catch( error => {
            //console.log(error)
            var errorText = error.message;
            if (typeof error.response?.data?.detail != 'undefined') 
                errorText = error.response.data.detail;
            setRequestError(errorText);
            setRequestMessage(null);
       });
    }


    const handleAuthReq = (event) => {
        
        axios({
            url: `http://localhost:8000/api/auth-request`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenStore[0]}`,
            },
        }).then(success => {

            console.log(success)

            setRequestMessage( JSON.stringify(success.data) );
            setRequestError(null);
        }).catch( error => {
            console.log(error)
            var errorText = error.message;
            if (typeof error.response?.data?.detail != 'undefined') 
                errorText = error.response.data.detail;
            setRequestError(errorText);
            setRequestMessage(null);
        });

    }


    const handleRefresh = (event) => {
        
        axios({
            url: `http://localhost:8000/auth/refresh`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenStore[0]}`,
            },
        }).then(success => {

            console.log(success)

            setRequestMessage( JSON.stringify(success.data) );
            setRequestError(null);
        }).catch( error => {
            console.log(error)
            var errorText = error.message;
            if (typeof error.response?.data?.detail != 'undefined') 
                errorText = error.response.data.detail;
            setRequestError(errorText);
            setRequestMessage(null);
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
                    
                    <SpacedButton onClick={handleLogIn} variant='contained'>Register</SpacedButton>

                    <SpacedButton onClick={handleLogIn} variant='contained'>Log In</SpacedButton>

                    <SpacedButton onClick={() => null} variant='contained'>Log Out</SpacedButton>

                    <SpacedLabel>
                        { tokenStore[0] && tokenStore[0].slice(0,20) || 'null token' }
                    </SpacedLabel>

                    <SpacedLabel sx={{ 'color': 'crimson' }}>
                        { tokenError }
                    </SpacedLabel>

                </ST.GridPanel>

                <ST.GridPanel item xs={8} lg={4} 
                    sx={{ 'justifyContent': 'space-between', 'flexDirection': 'column' }}>
                    
                    <SpacedButton onClick={handleNonAuth} variant='contained'>Non Auth Request</SpacedButton>

                    <SpacedButton onClick={handleAuthReq} variant='contained'>Auth Request</SpacedButton>

                    <SpacedButton onClick={handleRefresh} variant='contained'>Refresh</SpacedButton>

                    <SpacedLabel >
                        { requestMessage }
                    </SpacedLabel>

                    <SpacedLabel sx={{ 'color': 'crimson' }}>
                        { requestError }
                    </SpacedLabel>

                </ST.GridPanel>

            </Grid>
        </PageLayout>
    );
}

export default Admin;
