/**************************************************************************************************
AUTH PANEL
**************************************************************************************************/
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GlobalContext } from '../app-main/global-store';
import * as ST from '../elements/styled-elements';


const AuthGroup = styled(Box)(({ theme }) => ({
    padding: '6px 8px', 
    background: '#212121',    
}));

const UserName = styled(ST.SpecialText)(({ theme }) => ({
    fontSize: '150%',
    letterSpacing: '0.01em', 
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
        { !!userStore && ['initial', 'guest'].includes(userStore[0]['status']) && 
            <AuthGroup>
                <ST.FlexHorizontal sx={{ justifyContent: 'space-between' }} >
                    <UserName>
                        GUEST t
                    </UserName>
                    <AuthStack spacing='6px'>
                        <AuthButton onClick={() => { props.setModals[0](true); }}>
                            <ST.BaseText>Log In</ST.BaseText>
                        </AuthButton>
                        <AuthButton onClick={() => { props.setModals[2](true); }}>
                            <ST.BaseText>Sign Up</ST.BaseText>
                        </AuthButton>
                    </AuthStack>
                </ST.FlexHorizontal >
            </AuthGroup>
        }
        { !!userStore && ['user', 'admin'].includes(userStore[0]['status']) && 
            <AuthGroup>
                <ST.FlexHorizontal sx={{ justifyContent: 'space-between' }} >
                    <UserName>
                        { userStore[0]['name'] }
                    </UserName>
                    <AuthStack spacing='6px'>
                        <AuthButton onClick={() => { navigate('/account/'); }}>
                            <ST.BaseText>Account</ST.BaseText>
                        </AuthButton>
                        <AuthButton onClick={() => { props.setModals[1](true); }}>
                            <ST.BaseText>Log Out</ST.BaseText>
                        </AuthButton>
                    </AuthStack>
                </ST.FlexHorizontal>
            </AuthGroup>
        }
    </>);
}

AuthPanel.defaultProps = {
    setModals: [],
};

export default AuthPanel;
