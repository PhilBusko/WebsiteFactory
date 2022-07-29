/**************************************************************************************************
DESKTOP NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { Drawer, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; 
import * as ST from '../elements/styled-elements'
import AuthPanel from './auth-panel'
import NavRoutes from './nav-routes'


const drawerWidth = 200;
const navBkgd = '#212121';
const footerHeight = 34;
const footerBkgd = 'rgba(130,130,130,0.5)';

const BottomPanel = styled(Box)(({ theme }) => ({
    'position': 'fixed',
    'bottom': '2vh', 
    'width': drawerWidth,
    'height': footerHeight, 
    'background': footerBkgd, 
}));

const LogoImage = styled('img')(({ theme }) => ({
    width: footerHeight * 0.8, 
    height: footerHeight * 0.8, 
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

    // navigation drawer

    const [drawerOpen, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(!drawerOpen);
    };

    const NavDrawer = styled(Drawer)(({ theme }) => ({
        width: (drawerOpen ? drawerWidth : 0), 
        '& .MuiPaper-root': {
            width: drawerWidth, 
            background: navBkgd },
    }));

    // render

    return (<>
        <NavDrawer open={drawerOpen} variant='persistent' anchor='left'>

            <AuthPanel setModals={ props.setModals }/>

            <NavRoutes />

            <BottomPanel name='menu-bottom'>
                <ST.BoxCenter height='100%'>
                    <LogoImage src={require('../assets/app-icon.png')} />
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
    </>);
}

DesktopNav.defaultProps = {
    setModals: {},
};

export default DesktopNav;
