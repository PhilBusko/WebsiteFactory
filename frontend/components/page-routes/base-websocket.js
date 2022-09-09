/**************************************************************************************************
BASE WEBSOCKET PAGE
**************************************************************************************************/
import { useState } from 'react';
import { Grid, Box, Card } from '@mui/material';
import PageLayout from '../layout/page-layout';
import * as ST from '../elements/styled-elements';


function BaseWebsocket(props) {

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>BASE WEBSOCKET</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>




            </ST.GridPage>
        </PageLayout>
    );

}

export default BaseWebsocket;
