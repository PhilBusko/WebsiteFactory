/**************************************************************************************************
CONFIRM EMAIL
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid, Card } from '@mui/material';
import AxiosConfig from '../app-main/axios-config'
import PageLayout from '../layout/page-layout'
import * as ST from '../elements/styled-elements'


function ConfirmEmail(props) {

    const { userId } = useParams();
    const { token } = useParams();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState([]);

    useEffect(() => {

        // since strict mode is in use, this is called twice in dev

        setSuccess('your credentials have been sent to the server');

        function runConfirm() {
            AxiosConfig({
                method: 'POST',     
                url: '/auth/confirm-registration',
                data: { 'userId': userId, 'token': token },
            }).then(responseData => {
                setSuccess( responseData );
                setError([]);

                // send user to home page

            }).catch(errorLs => {
                setSuccess(null);
                setError(errorLs);
            });
        }

        setTimeout(() => {
            runConfirm();
        }, '3000')

    }, []);

    return (
        <PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <ST.PageTitle>Confirm Email</ST.PageTitle>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <Card elevation={3} sx={{ width: '280px', height: '170px', padding: '16px' }}> 
                        <ST.SpacedLabel >
                            { `User ID: ${userId}` }
                        </ST.SpacedLabel>
                        <ST.SpacedLabel >
                            {  `Token: ${token.slice(0,20)}...`  }
                        </ST.SpacedLabel>
                        <ST.HighlightedLabel >
                            { success }
                        </ST.HighlightedLabel>
                        <ST.SpacedLabel sx={{ color: 'crimson' }}>
                            { error.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </ST.SpacedLabel>
                    </Card>
                </ST.GridItemCenter>

            </Grid>
        </PageLayout>
    );
}

export default ConfirmEmail;
