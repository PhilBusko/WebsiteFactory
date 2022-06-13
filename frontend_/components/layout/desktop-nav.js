/**************************************************************************************************
DESKTOP NAVIGATION
**************************************************************************************************/
import { useState } from 'react';
import { ButtonBase } from '@mui/material';
import { List, ListItem, Typography } from '@mui/material';
import { Card }  from '@mui/material';
import { Drawer, Link } from '@mui/material';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Icons from '@mui/icons-material';
import Image from 'mui-image';
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

    const routesLs = RoutesConfig.filter(route => route.order > 0);

    return (<>
        <Drawer 
            variant='persistent' 
            open={drawerOpen}
            anchor='left' 
            sx={{ 'width': (drawerOpen ? drawerWidth : 0), '& .MuiPaper-root': {'width': drawerWidth} }}>
            <List name='menu-top' sx={{ 'padding': '0 10px' }}>
                {   routesLs.map( (route, key) => (
                    <ListItem key={key} button 
                        component={Link} href={route.path}
                        sx={{ 'margin': '10px 0px', 'padding': '0', }}
                        >
                        <Card sx={{ 'width': '10 0%', }} elevation={4}>
                            <Typography sx={{ 'padding': '4px 12px', 'background': 'white'}} >
                                {route.title}
                            </Typography>
                        </Card>
                    </ListItem>
                )) }
            </List>
            <Box name='menu-bottom'
                position='fixed' bottom='2vh' 
                width={drawerWidth} height={footerHeight} bgcolor={footerBkgd}>
                <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                    <Image src={require('../assets/app-icon.png')} duration={0} 
                        width={footerHeight * 0.8} height={footerHeight * 0.8} />
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
