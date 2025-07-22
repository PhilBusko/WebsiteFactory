/**************************************************************************************************
PAGE LAYOUT
**************************************************************************************************/
import { useState } from 'react';
import { IconButton, Menu, AppBar, ButtonBase } from '@mui/material';
import { Drawer, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; 

import * as ST from '../elements/styled-elements';
import AuthPanel from './auth-panel';
import NavRoutes from './nav-routes';


// NAVIGATION

const drawerWidth = 200;
const footerHeight = 34;
const footerBkgd = 'rgba(130,130,130,0.5)';

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
    'zIndex': 100,
    'width': footerHeight, 'height': footerHeight, 
    'background': footerBkgd,
    'borderTopRightRadius': '50%', 'borderBottomRightRadius': '50%',
}));

const LogoImage = styled('img')(({ theme }) => ({
    width: footerHeight * 0.8, 
    height: footerHeight * 0.8, 
}));


// CONTENT 

const ContentRelative = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
}));

const ContentOverlay = styled(Box)(({ theme }) => ({
    width: '100%',
}));


function PageLayout(props) {


    // NAVIGATION

    const matchMedia = window.matchMedia('(min-width: 900px)');  // xs and sm
    const startingOpen = (matchMedia.matches ? true : false);
    const [drawerOpen, setOpen] = useState(startingOpen);

    const [authAnchor, setAuthAnchor] = useState(null);

    const NavDrawer = styled(Drawer)(({ theme }) => ({
        width: (drawerOpen ? drawerWidth : 0), 
        '& .MuiPaper-root': {
            width: drawerWidth, 
            background: '#212121',
        },
    }));

    const toggleNav = () => {
        setOpen(!drawerOpen);
        setAuthAnchor(null);
    };

    const toggleAuth = (event) => {
        setOpen(false);
        setAuthAnchor(event.currentTarget);
    };


    // CONTENT

    const BackgroundImage = styled('img')(({ theme }) => ({
        position: 'fixed',
        left: (drawerOpen ? drawerWidth : 0),
        zIndex: -1,
        width: (drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%'),
        height: '100vh',

        background: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center center', 
        backgroundRepeat: 'no-repeat', 
    }));


    return (
        <ThemeProvider theme={ST.AppTheme}>
            <Box name='mobile' sx={{ display: { xs: 'block', md: 'none' }}} >
                <Box display='flex' flexDirection='column'>

                    <AppBar name='navigation'>
                        <ST.FlexHorizontal sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>

                            <Box sx={{ paddingLeft: '16px'}}>
                                <IconButton edge='start' color='inherit' onClick={ toggleNav }>
                                    <MenuIcon fontSize='large' />
                                </IconButton>

                                <NavDrawer open={drawerOpen} variant='persistent' anchor='left'>
                                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                        <IconButton onClick={ toggleNav }
                                            sx={{
                                                color: 'white',
                                                '&:hover': {background: footerBkgd} }}>
                                            <ChevronLeftIcon fontSize='large'/>
                                        </IconButton>
                                    </Box>

                                    <NavRoutes />

                                </NavDrawer>
                            </Box>

                            <Box sx={{ paddingRight: '12px'}}>
                                <IconButton edge='start' color='inherit' onClick={ toggleAuth }>
                                    <ManageAccountsIcon fontSize='large'/>
                                </IconButton>

                                <Menu
                                    anchorEl={authAnchor}
                                    open={Boolean(authAnchor)}
                                    onClose={() => {setAuthAnchor(null); }} 
                                    anchorOrigin={{'vertical': 'top', 'horizontal': 'left'}}
                                    sx={{   '& .MuiPaper-root': {   
                                                top: '48px !important', 
                                                width: '200px', 
                                                background: '#1976d2',
                                                border: '2px solid white', 
                                                borderRadius: '4px',
                                            },
                                            '& .MuiList-root': {padding: '0px'},     
                                    }}
                                >

                                    <AuthPanel/>

                                </Menu>
                            </Box>

                        </ST.FlexHorizontal>
                    </AppBar>

                    <ContentRelative name='content' sx={{ marginTop: '51px', marginRight: '16px' }}>
                        <BackgroundImage name='background'></BackgroundImage> 
                        <ContentOverlay name='foreground'>{ props.children }</ContentOverlay> 
                    </ContentRelative>

                </Box>
            </Box>
            <Box name='desktop' sx={{ display: { xs: 'none', md: 'block' }}} >
                <Box display='flex' flexDirection='row'>

                    <Box name='navigation'>
                        <NavDrawer open={drawerOpen} variant='persistent' anchor='left'>

                            <AuthPanel/>

                            <NavRoutes />

                            <BottomPanel name='menu-bottom'>
                                <ST.FlexHorizontal height='100%'>
                                    <LogoImage src={require('../assets/app-icon.png')} />
                                </ST.FlexHorizontal>
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
                    </Box>
                    
                    <ContentRelative name='content'>
                        <BackgroundImage name='background'></BackgroundImage> 
                        <ContentOverlay name='foreground'>{ props.children }</ContentOverlay> 
                    </ContentRelative>

                </Box>
            </Box>
            <br></br>
        </ThemeProvider>
    );
}

export default PageLayout;
