/**************************************************************************************************
NEW PASSWORD
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FormHelperText, Button } from '@mui/material';
import { Box, Grid, Card } from '@mui/material';
import zxcvbn from 'zxcvbn';
import AxiosConfig from '../app-main/axios-config';
import PageLayout from '../layout/page-layout';
import * as ST from '../elements/styled-elements';
import StackForm  from '../elements/stack-form';
import PasswordField from '../elements/password-field';


function NewPassword(props) {

    const { userId } = useParams();
    const { token } = useParams();
    const [formResult, setFormResult] = useState(null);

    useEffect(() => {
    }, []);

    const [password, setPassword] = useState('');

    function resetPassword() {

        if (zxcvbn(password).score < 2) {
            setFormResult('Password is too weak.');
            return;
        }

        AxiosConfig({
            method: 'POST',     
            url: '/auth/reset-password',
            data: { 'userId': userId, 'token': token, 'password': password },
        }).then(responseData => {
            setFormResult(responseData);
            setPassword('');
        }).catch(errorLs => {
            setFormResult(errorLs[errorLs.length-1]);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormResult(null);

        setTimeout(resetPassword, 500);
    }

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>Reset Password</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <Card elevation={3} sx={{ 'padding': '16px' }} > 
                        <StackForm width='260px'>

                            <ST.BaseText >
                                { `User ID: ${userId}` }
                            </ST.BaseText>

                            <PasswordField value={ password } 
                                onChange={(event) => { setPassword(event.target.value); }}/>

                            <ST.BoxSpaceBetween>
                                <Box sx={{ paddingRight: '6px' }}>
                                    <FormHelperText value={formResult}>{formResult}</FormHelperText>
                                </Box>
                                <Box>
                                    <Button type='submit' onClick={ handleSubmit } variant='contained'>Submit</Button>
                                </Box>
                            </ST.BoxSpaceBetween>

                        </StackForm>
                    </Card>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default NewPassword;
