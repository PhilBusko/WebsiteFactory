/**************************************************************************************************
USER ACCOUNT
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import AxiosConfig from '../app-main/axios-config';
import PageLayout from '../layout/page-layout';
import * as ST from '../elements/styled-elements';
import DisplayDict from '../elements/display/display-dict';
import { ReadOnlyArea } from '../elements/display/read-only';


function UserAccount(props) {

    const [userInfo, setUserInfo] = useState({});
    const [errorLs, setErrorLs] = useState([]);

    useEffect(() => {

        AxiosConfig({
            url: '/central/user-account',
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
                        <ST.TitleText>User Account</ST.TitleText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <Stack spacing='8px' sx={{ width: '380px' }}>
                            <DisplayDict 
                                infoDx={userInfo}
                                width= {'100%' }
                            />
                            { errorLs.length > 0 &&
                                <ReadOnlyArea label={ '' } valueLs={ errorLs } mode={ 'error' } />
                            }
                        </Stack>
                    </ST.ContentCard>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default UserAccount;
