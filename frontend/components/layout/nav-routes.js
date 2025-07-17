/**************************************************************************************************
NAVIGATION ROUTES 
**************************************************************************************************/
import { NavLink } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RoutesConfig } from '../app-main/routes'
import * as ST from '../elements/styled-elements'


const footerBkgd = 'rgba(130,130,130,0.5)';

const NavList = styled(List)(({ theme }) => ({
    borderTop: '1px solid white', 
    padding: '6px 0 0 0',   /* T R B L */
}));

const NavItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'right',
    padding: '6px 0',
    '&:hover': {    
        background: footerBkgd, 
        '& .MuiTypography-root': { fontWeight: '600' }, 
    },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    '& .MuiTypography-root': { color: 'white', },
    '&.active .MuiTypography-root': { color: 'gold', },
}));

const NavText = styled(ST.LinkText)(({ theme }) => ({
    paddingRight: '12px',
    fontSize: '17px',
}));


function NavRoutes(props) {

    const routeLs = RoutesConfig.filter(route => route.order > 0);

    return (
        <NavList>
            {   routeLs.map( (route, key) => (
                <NavItem key={ key } button>
                    <StyledNavLink to={ route.path }>
                        <NavText>{ route.title }</NavText>
                    </StyledNavLink>
                </NavItem>
            )) }
        </NavList>
    );
}

export default NavRoutes;
