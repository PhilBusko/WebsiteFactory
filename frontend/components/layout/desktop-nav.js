/**************************************************************************************************
DESKTOP NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { ButtonBase } from '@mui/material';
import { List, ListItem, Table, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Drawer, Menu, Link, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Icons from '@mui/icons-material';
import { RoutesConfig } from '../app-main/routes.js'



const drawerWidth = 200;
const footerHeight = 34;
const footerBkgd = 'rgba(130,130,130,0.5)';

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

    return (<>
        <Drawer 
            variant='persistent' 
            open={drawerOpen}
            anchor='left' 
            sx={{ 'width': (drawerOpen ? drawerWidth : 0) }}>

                <List>
                    {   RoutesConfig.map( (config, key) => (
                        <ListItem key={key} button component={Link} href={config.path}>
                            <Typography>
                                {config.title}
                            </Typography>
                        </ListItem>
                    )) }
                </List>

                <Box name='menu-bottom'
                     position='fixed' bottom='2vh' 
                     width={drawerWidth} height={footerHeight} bgcolor={footerBkgd}>
                    <Box display='flex' justifyContent='center'>
                        footer
                    </Box>
                    <MenuCollapseButton onClick={toggleNav}>
                        <Icons.ArrowBack ></Icons.ArrowBack>
                    </MenuCollapseButton>
                </Box>
        </Drawer>
        {!drawerOpen &&
            <MenuOpenButton onClick={toggleNav}>
                <Icons.ArrowForward ></Icons.ArrowForward>
            </MenuOpenButton>
        }
    </>);
}

export default DesktopNav;
