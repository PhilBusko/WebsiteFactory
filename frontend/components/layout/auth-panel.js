/**************************************************************************************************
AUTH PANEL
**************************************************************************************************/
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { GlobalContext } from '../app-main/global-store';
import * as ST from '../elements/styled-elements';
import LogInModal from '../modals/login-modal';
import SignUpModal from '../modals/signup-modal';
import LogOutModal from '../modals/logout-modal';


const AuthGroup = styled(Box)(({ theme }) => ({
    padding: '6px 8px', 
}));

const UserName = styled(ST.TitleText)(({ theme }) => ({
    fontSize: '30px',
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
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'white',
        '&:hover': {textDecoration: 'underline',}, 
    },
}));


function AuthPanel(props) {

    const { userStore } = useContext(GlobalContext);
    let navigate = useNavigate();

    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);


    return (<>
        { !!userStore && ['initial', 'guest'].includes(userStore[0]['status']) && 
            <AuthGroup>
                <ST.FlexHorizontal sx={{ justifyContent: 'space-between' }} >
                    <UserName>
                        GUEST
                    </UserName>
                    <AuthStack spacing='6px'>
                        <AuthButton onClick={() => { setLoginOpen(true); }}>
                            <ST.SpecialText>Log In</ST.SpecialText>
                        </AuthButton>
                        <AuthButton onClick={() => { setSignupOpen(true); }}>
                            <ST.SpecialText>Sign Up</ST.SpecialText>
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
                            <ST.SpecialText>Account</ST.SpecialText>
                        </AuthButton>
                        <AuthButton onClick={() => { setLogoutOpen(true); }}>
                            <ST.SpecialText>Log Out</ST.SpecialText>
                        </AuthButton>
                    </AuthStack>
                </ST.FlexHorizontal>
            </AuthGroup>
        }

        <LogInModal open={loginOpen} setOpen={setLoginOpen} />
        <SignUpModal open={signupOpen} setOpen={setSignupOpen} />
        <LogOutModal open={logoutOpen} setOpen={setLogoutOpen} />

    </>);
}

AuthPanel.defaultProps = {
};

export default AuthPanel;
