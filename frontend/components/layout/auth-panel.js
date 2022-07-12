/**************************************************************************************************
AUTH GROUP
**************************************************************************************************/
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { Box } from '@mui/material';

import { GlobalContext } from '../app-main/global-store'
import * as ST from '../elements/styled-elements'


const AuthGroup = styled(ST.BoxSpaceBetween)(({ theme }) => ({
    padding: '6px 8px', 
    background: '#212121',    
}));

const UserName = styled(ST.BaseText)(({ theme }) => ({
    fontSize: '125%',
    color: 'white',
    whiteSpace: 'nowrap',
}));

const AuthButton = styled(ButtonBase)(({ theme }) => ({
    marginBottom: '4px',
    justifyContent: 'right',
    '& .MuiTypography-root': { 
        fontSize: '90%',
        color: 'white',
        textDecoration: 'underline',
        '&:hover': {fontWeight: '600'}, },
}));


function AuthPanel(props) {

    const { userStore } = useContext(GlobalContext);
    let navigate = useNavigate();  

    return (<>
        {!userStore[0] && 
            <AuthGroup>
                <UserName>
                    Guest User
                </UserName>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <AuthButton onClick={() => { props.setModals[0](true); }}>
                        <ST.BaseText>Log In</ST.BaseText>
                    </AuthButton>
                    <AuthButton onClick={() => { props.setModals[2](true); }}>
                        <ST.BaseText>Sign Up</ST.BaseText>
                    </AuthButton>
                </Box>
            </AuthGroup>
        }
        {!!userStore[0] && 
            <AuthGroup sx={{ border: '1px solid white', borderRadius: '4px' }}>
                <UserName>
                    { userStore[0] }
                </UserName>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <AuthButton onClick={() => { navigate('/account/'); }}>
                        <ST.BaseText>Account</ST.BaseText>
                    </AuthButton>
                    <AuthButton onClick={() => { props.setModals[1](true); }}>
                        <ST.BaseText>Log Out</ST.BaseText>
                    </AuthButton>
                </Box>
            </AuthGroup>
        }
    </>);
}

AuthPanel.defaultProps = {
    setModals: [],
};

export default AuthPanel;
