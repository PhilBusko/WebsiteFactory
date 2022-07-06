/**************************************************************************************************
DESKTOP NAVIGATION
**************************************************************************************************/
import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { List, ListItem, Typography } from '@mui/material';
import { Drawer, Link } from '@mui/material';
import { Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; 
import Image from 'mui-image';
import { RoutesConfig } from '../app-main/routes'
import { GlobalContext } from '../app-main/global-store'
import * as ST from '../elements/styled-elements'

import LogInModal from '../modals/login-modal'

const drawerWidth = 200;
const footerHeight = 34;
const footerBkgd = 'rgba(130,130,130,0.5)';
const navBkgd = '#212121';



const AuthButton = styled(ButtonBase)(({ theme }) => ({
    'marginBottom': '4px',
    'color': 'white',
    'fontSize': '80%',
    'textDecoration': 'underline',
}));

const NavList = styled(List)(({ theme }) => ({
    'padding': '0 10px', 
    '& .MuiLink-root': { 
        'background': navBkgd, 
        '&:hover': {'background': footerBkgd} }
}));

const NavItem = styled(ListItem)(({ theme }) => ({
    'margin': '10px 0px',
    'padding': '0',
    '& .MuiTypography-root': {
        'padding': '4px 12px', 
        'color': 'white' }
}));

const BottomPanel = styled(Box)(({ theme }) => ({
    'position': 'fixed',
    'bottom': '2vh', 
    'width': drawerWidth,
    'height': footerHeight, 
    'background': footerBkgd, 
}));

const MenuCollapseButton = styled(ButtonBase)(({ theme }) => ({
    'position': 'absolute', 'left': drawerWidth, 'top': 0,
    'width': footerHeight, 'height': footerHeight, 
    'background': footerBkgd,
    'borderTopRightRadius': '50%', 'borderBottomRightRadius': '50%',
}));

const MenuOpenButton = styled(ButtonBase)(({ theme }) => ({
    'position': 'absolute', 'bottom': '2vh',
    'width': footerHeight, 'height': footerHeight, 
    'background': footerBkgd,
    'borderTopRightRadius': '50%', 'borderBottomRightRadius': '50%',
}));

function DesktopNav(props) {

    const routesLs = RoutesConfig.filter(route => route.order > 0);
    const { userStore } = useContext(GlobalContext);

    // navigation drawer

    const [drawerOpen, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(!drawerOpen);
    };

    const NavDrawer = styled(Drawer)(({ theme }) => ({
        'width': (drawerOpen ? drawerWidth : 0), 
        '& .MuiPaper-root': {
            'width': drawerWidth, 
            'background': navBkgd },
    }));

    

    // auth buttons

    const [loginOpen, setLoginOpen] = useState(true);
    const [signupOpen, setSignupOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);


    const handleLogin = () => {
        setLoginOpen(true);
    };



    return (<>
        <NavDrawer open={drawerOpen} 
            variant='persistent' anchor='left' >

            <ST.BoxSpaceBetween sx={{ padding: '6px 8px', borderBottom: '1px solid white'}}>
                <Typography sx={{ color: 'white' }}>
                    { userStore[0] || 'Guest User' }
                </Typography>
                <Box sx={{ width: '50px', textAlign: 'right' }}>
                    <AuthButton onClick={handleLogin}>Log In</AuthButton>
                    <AuthButton>Sign Up</AuthButton>
                </Box>
            </ST.BoxSpaceBetween>

            <NavList name='menu-top'>
                {   routesLs.map( (route, key) => (
                    <NavItem key={key} button component={Link} href={route.path}>
                        <Typography sx={{ width: '100%', textAlign: 'right' }}>
                            {route.title}
                        </Typography>
                    </NavItem>
                )) }
            </NavList>
            <BottomPanel name='menu-bottom'>
                <ST.BoxCenter height='100%'>
                    <Image src={require('../assets/app-icon.png')} duration={0} 
                        width={footerHeight * 0.8} height={footerHeight * 0.8} />
                </ST.BoxCenter>
                <MenuCollapseButton onClick={toggleNav}>
                    <ArrowBack></ArrowBack>
                </MenuCollapseButton>
            </BottomPanel>
        </NavDrawer>
        {!drawerOpen &&
            <MenuOpenButton onClick={toggleNav}>
                <ArrowForward></ArrowForward>
            </MenuOpenButton>
        }
        <LogInModal open={loginOpen} setOpen={setLoginOpen} />
    </>);
}

export default DesktopNav;
