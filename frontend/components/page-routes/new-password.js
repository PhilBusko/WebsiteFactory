/**************************************************************************************************
NEW PASSWORD
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, Grid, Card } from '@mui/material';
import zxcvbn from 'zxcvbn';
import AxiosConfig from '../app-main/axios-config';
import PageLayout from '../layout/page-layout';
import * as ST from '../elements/styled-elements';
import StackForm  from '../elements/controls/stack-form';
import ReadOnlyLabel from '../elements/controls/read-only-label'
import PasswordField from '../elements/controls/password-field';
import FormSubmit from '../elements/controls/form-submit'


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
                        <ST.TitleText>RESET PASSWORD</ST.TitleText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <StackForm width='260px'>

                            <ReadOnlyLabel label={'User ID'} value={userId} />

                            <PasswordField value={ password } 
                                onChange={(event) => { setPassword(event.target.value); }}/>

                            <FormSubmit message={ formResult } 
                                onSubmit={ handleSubmit }/>

                        </StackForm>
                    </ST.ContentCard>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default NewPassword;
