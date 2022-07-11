/**************************************************************************************************
DESKTOP NAVIGATION
**************************************************************************************************/
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { Drawer, Link } from '@mui/material';
import { Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; 
import Image from 'mui-image';

import { RoutesConfig } from '../app-main/routes'
import { GlobalContext } from '../app-main/global-store'
import * as ST from '../elements/styled-elements'

const drawerWidth = 200;
const footerHeight = 34;
const footerBkgd = 'rgba(130,130,130,0.5)';
const navBkgd = '#212121';


const AuthGroup = styled(ST.BoxSpaceBetween)(({ theme }) => ({
    padding: '6px 8px', 
    borderBottom: '1px solid white',
}));

const UserName = styled(ST.BaseText)(({ theme }) => ({
    fontSize: '125%',
    color: 'white',
    whiteSpace: 'nowrap',
}));

const AuthButton = styled(ButtonBase)(({ theme }) => ({
    marginBottom: '4px',
    justifyContent: 'right',
    '& .MuiTypography-root': { 
        fontSize: '90%',
        color: 'white',
        textDecoration: 'underline',
        '&:hover': {fontWeight: '600'}, },
}));


const NavList = styled(List)(({ theme }) => ({
    padding: '6px 0 0 0',   /* T R B L */
    '&:not(:first-of-type)': {},
}));

const NavItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'right',
    padding: '6px 0',
    '&:hover': {    background: footerBkgd, 
                    '& .MuiTypography-root': { fontWeight: '600' }, },
}));

const NavText = styled(ST.SpecialText)(({ theme }) => ({
    paddingRight: '12px',
    color: 'white', 
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
    let navigate = useNavigate();  

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

    // render

    return (<>
        <NavDrawer open={drawerOpen} variant='persistent' anchor='left' >
            {!userStore[0] && 
                <AuthGroup>
                    <UserName>
                        Guest User
                    </UserName>
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <AuthButton onClick={() => { props.setModals[0](true); }}>
                            <ST.BaseText>Log In</ST.BaseText>
                        </AuthButton>
                        <AuthButton onClick={() => { props.setModals[2](true); }}>
                            <ST.BaseText>Sign Up</ST.BaseText>
                        </AuthButton>
                    </Box>
                </AuthGroup>
            }
            {!!userStore[0] && 
                <AuthGroup>
                    <UserName>
                        { userStore[0] }
                    </UserName>
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <AuthButton onClick={() => { navigate('/account/'); }}>
                            <ST.BaseText>Account</ST.BaseText>
                        </AuthButton>
                        <AuthButton onClick={() => { props.setModals[1](true); }}>
                            <ST.BaseText>Log Out</ST.BaseText>
                        </AuthButton>
                    </Box>
                </AuthGroup>
            }
            <NavList name='menu-top'>
                {   routesLs.map( (route, key) => (
                    <NavItem key={key} button component={Link} href={route.path}>
                        <NavText>
                            {route.title}
                        </NavText>
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
    </>);
}

DesktopNav.defaultProps = {
    setModals: {},
};

export default DesktopNav;
