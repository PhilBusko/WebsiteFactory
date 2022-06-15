/**************************************************************************************************
MOBILE NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { IconButton  } from '@mui/material';
import { Typography, Divider } from '@mui/material';
import { AppBar, Toolbar, Card }  from '@mui/material';
import { Link, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { RoutesConfig } from '../app-main/routes.js'

function MobileNav(props) {
    
    const [anchorElem, setAnchorElem] = useState(null);
    const mobileMenuOpen = (event) => {
        setAnchorElem(event.currentTarget);
    };
    const mobileMenuClose = () => {
        setAnchorElem(null);
    };
    
    const routesLs = RoutesConfig.filter(route => route.order > 0);

    return (<>
        <AppBar  >
            <Toolbar>
                <IconButton edge='start' color='inherit' onClick={mobileMenuOpen}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorElem}
                    open={Boolean(anchorElem)}
                    onClose={mobileMenuClose} 
                    anchorOrigin={{'vertical': 'top', 'horizontal': 'left'}}
                    sx={{ '& .MuiPaper-root': {'background': 'light blue'},
                          '& .MuiList-root': {'padding': 0,}, }} >
                    {   routesLs.map((route, key) => (
                        <Box key={key}>
                            {key != 0 && <Divider sx={{ 'margin': '0 !important' }}/>}
                            <MenuItem 
                                component={Link} href={route.path}
                                sx={{ 'min-height': '0', 'padding': '0' }} >
                                <Typography sx={{ 'padding': '10px 14px', 'background': 'white'}} >
                                    {route.title}
                                </Typography>
                            </MenuItem>
                        </Box>
                    )) }
                </Menu>
            </Toolbar>
        </AppBar>
        <Toolbar comment='stops the appbar from overlaying'/>
    </>);
}

export default MobileNav;
