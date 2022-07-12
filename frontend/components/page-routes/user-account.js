/**************************************************************************************************
USER ACCOUNT
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Grid, Card } from '@mui/material';
import AxiosConfig from '../app-main/axios-config'
import PageLayout from '../layout/page-layout'
import * as ST from '../elements/styled-elements'


function UserAccount(props) {

    const [userInfo, setUserInfo] = useState({});
    const [errorLs, setErrorLs] = useState([]);
    const dummy = 0;

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
                    <Card elevation={3} sx={{ width: '280px', padding: '16px',
                            '& .MuiTypography-root': { marginBottom: '4px' },  }}> 
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
                        <ST.BaseText sx={{ 'color': 'crimson' }}>
                            { errorLs.map( (err, idx) => 
                                <div key={idx}>{err}</div>
                            )}
                        </ST.BaseText>
                    </Card>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default UserAccount;
