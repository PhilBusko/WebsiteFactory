/**************************************************************************************************
CONFIRM EMAIL
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid, Card } from '@mui/material';
import AxiosConfig from '../app-main/axios-config'
import * as LY from '../layout/page-layout.js'


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
        <LY.PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <LY.PageTitle>Confirm Email</LY.PageTitle>
                </Grid>

                <LY.GridPanel item xs={12} lg={6}>
                    <Card elevation={3} sx={{ width: '280px', height: '170px', padding: '16px' }}> 
                        <LY.SpacedLabel >
                            { `User ID: ${userId}` }
                        </LY.SpacedLabel>
                        <LY.SpacedLabel >
                            {  `Token: ${token.slice(0,20)}...`  }
                        </LY.SpacedLabel>
                        <LY.HighlightedLabel >
                            { success }
                        </LY.HighlightedLabel>
                        <LY.SpacedLabel sx={{ color: 'crimson' }}>
                            { error.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </LY.SpacedLabel>
                    </Card>
                </LY.GridPanel>

            </Grid>
        </LY.PageLayout>
    );
}

export default ConfirmEmail;
