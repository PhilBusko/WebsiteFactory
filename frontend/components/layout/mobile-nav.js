/**************************************************************************************************
MOBILE NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { AppBar, Toolbar, Drawer, Menu } from '@mui/material';
import { IconButton, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';




function MobileNav(props) {
    
    const [anchorElem, setAnchorElem] = useState(null);
    const mobileMenuOpen = (event) => {
        setAnchorElem(event.currentTarget);
    };
    const mobileMenuClose = () => {
        setAnchorElem(null);
    };
    
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
                    anchorOrigin={{vertical: 'top', horizontal: 'left'}} >
                    <MenuItem onClick={mobileMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={mobileMenuClose}>My account</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
        <Toolbar comment='stops the appbar from overlaying'/>
    </>);
}

export default MobileNav;
