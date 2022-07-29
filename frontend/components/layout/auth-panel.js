/**************************************************************************************************
AUTH PANEL
**************************************************************************************************/
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GlobalContext } from '../app-main/global-store'
import * as ST from '../elements/styled-elements'


const AuthGroup = styled(Box)(({ theme }) => ({
    padding: '6px 8px', 
    background: '#212121',    
}));

const UserName = styled(ST.BaseText)(({ theme }) => ({
    fontSize: '125%',
    color: 'white',
    whiteSpace: 'nowrap',
}));

const AuthStack = styled(Stack)(({ theme }) => ({
    width: '60px',
    padding: '4px 0px',
    alignItems: 'end',
}));

const AuthButton = styled(ButtonBase)(({ theme }) => ({
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
                <ST.BoxSpaceBetween>
                    <UserName>
                        Guest User
                    </UserName>
                    <AuthStack spacing='6px'>
                        <AuthButton onClick={() => { props.setModals[0](true); }}>
                            <ST.BaseText>Log In</ST.BaseText>
                        </AuthButton>
                        <AuthButton onClick={() => { props.setModals[2](true); }}>
                            <ST.BaseText>Sign Up</ST.BaseText>
                        </AuthButton>
                    </AuthStack>
                </ST.BoxSpaceBetween>
            </AuthGroup>
        }
        {!!userStore[0] && 
            <AuthGroup>
                <ST.BoxSpaceBetween>
                    <UserName>
                        { userStore[0] }
                    </UserName>
                    <AuthStack spacing='6px'>
                        <AuthButton onClick={() => { navigate('/account/'); }}>
                            <ST.BaseText>Account</ST.BaseText>
                        </AuthButton>
                        <AuthButton onClick={() => { props.setModals[1](true); }}>
                            <ST.BaseText>Log Out</ST.BaseText>
                        </AuthButton>
                    </AuthStack>
                </ST.BoxSpaceBetween>
            </AuthGroup>
        }
    </>);
}

AuthPanel.defaultProps = {
    setModals: [],
};

export default AuthPanel;
