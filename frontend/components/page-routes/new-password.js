/**************************************************************************************************
NEW PASSWORD
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { TextField, FormHelperText, Button } from '@mui/material';
import { Grid, Card } from '@mui/material';
import zxcvbn from 'zxcvbn';
import AxiosConfig from '../app-main/axios-config'
import * as LY from '../layout/page-layout.js'
import { StackForm, FormItem } from '../elements/stack-form.js'


function NewPassword(props) {

    const { userId } = useParams();
    const { token } = useParams();
    const [formResult, setFormResult] = useState(null);

    useEffect(() => {
    }, []);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }

    function validateForm() {
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (zxcvbn(password).score < 2) {
            return 'Password is too weak';
        }
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setPasswordError(null);
        setFormResult(null);

        var hasError = validateForm();
        if (hasError) {
            setPasswordError(hasError);
            return;
        }

        AxiosConfig({
            method: 'POST',     
            url: '/auth/reset-password',
            data: { 'userId': userId, 'token': token, 'password': password },
        }).then(responseData => {
            setFormResult(responseData);
        }).catch(errorLs => {
            setFormResult(errorLs[errorLs.length-1]);
        });
    }

    return (
        <LY.PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <LY.PageTitle>Reset Password</LY.PageTitle>
                </Grid>

                <LY.GridPanel item xs={12} lg={6}>
                    <Card elevation={3} sx={{ width: '280px', padding: '16px' }}> 
                        <StackForm width='260px'>
                            <FormItem >
                                <LY.SpacedLabel >
                                    { `User ID: ${userId}` }
                                </LY.SpacedLabel>
                            </FormItem>
                            <FormItem >
                                <TextField 
                                    value={ password } error={ !!passwordError } helperText={ passwordError }
                                    onChange={ handlePassword }  
                                    type='password' inputProps={{ autoComplete: 'new-password' }}
                                    variant='outlined' label='New Password' size='small' sx={{width: '100%' , height: '64px'}}  />
                            </FormItem>
                            <FormItem sx={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                                <FormHelperText value={formResult}>{formResult}</FormHelperText>
                                <Button type='submit' onClick={ handleSubmit } variant='contained'>Submit</Button>
                            </FormItem>
                        </StackForm>
                    </Card>
                </LY.GridPanel>

            </Grid>
        </LY.PageLayout>
    );
}

export default NewPassword;
