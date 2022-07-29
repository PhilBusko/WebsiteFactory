/**************************************************************************************************
MOBILE NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton  } from '@mui/material';
import { Menu, Drawer } from '@mui/material';
import { AppBar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import * as ST from '../elements/styled-elements';
import AuthPanel from './auth-panel';
import NavRoutes from './nav-routes';


const drawerWidth = 200;
const navBkgd = '#212121';
const footerBkgd = 'rgba(130,130,130,0.5)';

function MobileNav(props) {

    const [drawerOpen, setOpen] = useState(false);
    const [authAnchor, setAuthAnchor] = useState(null);

    const NavDrawer = styled(Drawer)(({ theme }) => ({
        width: (drawerOpen ? drawerWidth : 0), 
        '& .MuiPaper-root': {
            width: drawerWidth, 
            background: navBkgd,     },
    }));

    const toggleNav = () => {
        setOpen(!drawerOpen);
        setAuthAnchor(null);
    };

    const toggleAuth = (event) => {
        setOpen(false);
        setAuthAnchor(event.currentTarget);
    };

    return (<>
        <AppBar>
            <ST.BoxSpaceBetween>

                <Box sx={{ paddingLeft: '16px'}}>
                    <IconButton edge='start' color='inherit' onClick={toggleNav}>
                        <MenuIcon fontSize='large' />
                    </IconButton>

                    <NavDrawer open={drawerOpen} variant='persistent' anchor='left'>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                            <IconButton onClick={toggleNav}
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
                        sx={{   '& .MuiPaper-root': {   width: '200px', top: '48px !important', 
                                                        border: '2px solid white', borderRadius: '4px' }, 
                                '& .MuiList-root': {padding: '0px'},     }} >
                        
                        <AuthPanel setModals={ props.setModals }/>

                    </Menu>
                </Box>

            </ST.BoxSpaceBetween>
        </AppBar>
    </>);
}

MobileNav.defaultProps = {
    setModals: {},
};

export default MobileNav;
