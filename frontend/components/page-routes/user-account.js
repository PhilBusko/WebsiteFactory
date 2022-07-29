/**************************************************************************************************
USER ACCOUNT
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Grid, Stack, Box, Card } from '@mui/material';
import AxiosConfig from '../app-main/axios-config'
import PageLayout from '../layout/page-layout'
import * as ST from '../elements/styled-elements'


function UserAccount(props) {

    const [userInfo, setUserInfo] = useState({});
    const [errorLs, setErrorLs] = useState([]);

    useEffect(() => {

        AxiosConfig({
            url: '/auth/user-account',
        }).then(responseData => {
            setUserInfo(responseData);
            setErrorLs([]);
        }).catch(errorLs => {
            setErrorLs(errorLs);
        });

    }, []);

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>User Account</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <Card elevation={3} sx={{ padding: '16px' }}> 
                        <Stack spacing='8px' sx={{ width: '280px' }}>
                            <ST.BaseText >
                                { `Name: ${userInfo.user_name}` }
                            </ST.BaseText>
                            <ST.BaseText >
                                {  `Email: ${userInfo.email}`  }
                            </ST.BaseText>
                            <ST.BaseText >
                                {  `Unique ID: ${userInfo.unique_id}`  }
                            </ST.BaseText>
                            <ST.BaseText >
                                {  `Date Joined: ${userInfo.date_joined}`  }
                            </ST.BaseText>
                            <Box>
                                { errorLs.map( (err, idx) => 
                                    <ST.BaseText key={idx} sx={{ 'color': 'crimson' }}>
                                        {err}
                                    </ST.BaseText>
                                )}
                            </Box>
                        </Stack>
                    </Card>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default UserAccount;
