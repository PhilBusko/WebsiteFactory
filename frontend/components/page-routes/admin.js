/**************************************************************************************************
PAGE
**************************************************************************************************/
import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import { GlobalContext } from '../app-main/global-store'
//import * as AUTH from '../app-main/authentication'
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
    const { baseUrlStore } = React.useContext(GlobalContext);

    React.useEffect(() => {
        //console.log(tokenStore[0]);
    }, [])

    return (
        <PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <ST.PageTitle>Auth Dev</ST.PageTitle>
                </Grid>

                <ST.GridPanel item xs={8} lg={4} 
                    sx={{ 'justifyContent': 'space-between', 'flexDirection': 'column' }}>
                    
                    <SpacedButton onClick={() => null} variant='contained'>Register</SpacedButton>

                    <SpacedButton onClick={() => null} variant='contained'>Log In</SpacedButton>

                    <SpacedButton onClick={() => null} variant='contained'>Log Out</SpacedButton>

                    <SpacedLabel>
                        { tokenStore[0] || 'null token' }
                    </SpacedLabel>

                    <SpacedLabel>
                        { baseUrlStore[0] }
                    </SpacedLabel>

                </ST.GridPanel>

            </Grid>
        </PageLayout>
    );
}

export default Admin;
