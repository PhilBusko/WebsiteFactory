/**************************************************************************************************
NAVIGATION ROUTES 
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { List, ListItem, Link } from '@mui/material';
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
    '&:hover': {    background: footerBkgd, 
                    '& .MuiTypography-root': { fontWeight: '600' }, },
}));

const NavText = styled(ST.SpecialText)(({ theme }) => ({
    paddingRight: '12px',
    color: 'white', 
}));


function NavRoutes(props) {

    const routesLs = RoutesConfig.filter(route => route.order > 0);

    return (
        <NavList>
            {   routesLs.map( (route, key) => (
                <NavItem key={key} button component={Link} href={route.path}>
                    <NavText>
                        {route.title}
                    </NavText>
                </NavItem>
            )) }
        </NavList>
    );
}

export default NavRoutes;
