/**************************************************************************************************
PAGE LAYOUT
**************************************************************************************************/
import { useState } from 'react';
import { Box } from '@mui/material';
import MobileNav from './mobile-nav.js';
import DesktopNav from './desktop-nav.js';
import LogInModal from '../modals/login-modal';
import LogOutModal from '../modals/logout-modal';
import SignUpModal from '../modals/signup-modal';


function PageLayout(props) {

    const [loginOpen, setLoginOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const modalSetters = [setLoginOpen, setLogoutOpen, setSignupOpen];

    return (
        <>
            <Box name='mobile' sx={{ display: { xs: 'block', md: 'none' }}} >
                <Box display='flex' flexDirection='column'>
                    <MobileNav setModals={modalSetters}></MobileNav>
                    <Box sx={{ marginTop: '51px', marginRight: '16px' }}>{ props.children }</Box>
                </Box>
            </Box>
            <Box name='desktop' sx={{ display: { xs: 'none', md: 'block' }}} >
                <Box display='flex' flexDirection='row'>
                    <DesktopNav name='navigation' setModals={modalSetters}></DesktopNav>
                    <Box name='content' width='100%'>{ props.children }</Box>
                </Box>
            </Box>
            <LogInModal open={loginOpen} setOpen={setLoginOpen} />
            <LogOutModal open={logoutOpen} setOpen={setLogoutOpen} />
            <SignUpModal open={signupOpen} setOpen={setSignupOpen} />
        </>
    );
}

export default PageLayout;
