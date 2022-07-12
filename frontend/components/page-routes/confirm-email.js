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
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>Confirm Email</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <Card elevation={3} sx={{ width: '280px', height: '170px', padding: '16px' }}> 
                        <ST.BaseText >
                            { `User ID: ${userId}` }
                        </ST.BaseText>
                        <ST.BaseText >
                            {  `Token: ${token.slice(0,20)}...`  }
                        </ST.BaseText>
                        <ST.HighlightText >
                            { success }
                        </ST.HighlightText>
                        <ST.BaseText sx={{ color: 'crimson' }}>
                            { error.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </ST.BaseText>
                    </Card>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default ConfirmEmail;
