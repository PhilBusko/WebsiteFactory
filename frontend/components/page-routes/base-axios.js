/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { Card } from '@mui/material';
import { Box, Grid } from '@mui/material';
import PageLayout from '../layout/page-layout.js'
import * as ST from '../layout/styled-elements.js'
import { StackForm, FormItem } from '../elements/stack-form.js'



function BaseAxios(props) {


    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const handleUserName = (evt) => {
        console.log(evt)
    }

    const handleSubmit = (evt) => {
        console.log('submit clicked');
        evt.preventDefault();

        // axios({
        //     method: 'put',      // must use put to send data
        //     url: 'base-axios/dummy/',
        //     data: { 'inputVal': inputVal },
        // }).then( success => {
        //     //console.log('received: ', success.data);
        //     setInput(success.data.dummyVal);
        // }).catch( error => {
        //     console.log(error);
        // });
    }

    return (
        <PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <ST.PageTitle>
                        Base Axios
                    </ST.PageTitle>
                </Grid>

                <ST.GridPanel item xs={12} lg={6}>

                    <StackForm>

                        <FormItem >
                            <TextField variant='outlined' label='User Name' size='small'
                                value={ userName } onChange={ handleUserName } error={ userNameError }/>
                        </FormItem>
                        
                        <FormItem sx={{ 'textAlign': 'right' }}>
                            <Button type='submit' onClick={ handleSubmit } variant='contained'>Send Form</Button>
                        </FormItem>

                    </StackForm>

                </ST.GridPanel>

                <ST.GridPanel item xs={12} lg={6}>
                    <Card elevation={3}> 
                        island 2
                    </Card>
                </ST.GridPanel>

            </Grid>
        </PageLayout>
    );
}

export default BaseAxios;
