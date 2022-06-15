/**************************************************************************************************
DESKTOP NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { List, ListItem, Typography } from '@mui/material';
import { Drawer, Link } from '@mui/material';
import { Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; 
import Image from 'mui-image';
import { RoutesConfig } from '../app-main/routes.js'
import './styles.scss'

const drawerWidth = 200;
const footerHeight = 34;
const footerBkgd = 'rgba(130,130,130,0.5)';
const navBkgd = '#212121';

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
    
    const routesLs = RoutesConfig.filter(route => route.order > 0);

    return (<>
        <NavDrawer open={drawerOpen} 
            variant='persistent' anchor='left' >
            <NavList name='menu-top'>
                {   routesLs.map( (route, key) => (
                    <NavItem key={key} button component={Link} href={route.path}>
                        <Typography>
                            {route.title}
                        </Typography>
                    </NavItem>
                )) }
            </NavList>
            <BottomPanel name='menu-bottom'>
                <Box height='100%' className='panel-center'>
                    <Image src={require('../assets/app-icon.png')} duration={0} 
                        width={footerHeight * 0.8} height={footerHeight * 0.8} />
                </Box>
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

export default DesktopNav;
