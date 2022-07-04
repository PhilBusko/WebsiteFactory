/**************************************************************************************************
PAGE LAYOUT
**************************************************************************************************/
import { Button } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import MobileNav from './mobile-nav.js';
import DesktopNav from './desktop-nav.js';

function PageLayout(props) {
    return (
        <>
            <Box name='mobile' sx={{ display: { xs: 'block', md: 'none' }}} >
                <MobileNav></MobileNav>
                <Box>{ props.children }</Box>
            </Box>
            <Box name='desktop' sx={{ display: { xs: 'none', md: 'block' }}} >
                <Box display='flex' flexDirection='row' >
                    <DesktopNav name='navigation'></DesktopNav>
                    <Box name='content' width='100%'>{ props.children }</Box>
                </Box>
            </Box>
        </>
    );
}

const GridPanel = styled(Grid)(({ theme }) => ({
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
}));

const PageTitle = styled('h1')(({ theme }) => ({
    'margin': '10px 0px',
    'borderBottom': '2px solid grey',
    'color': 'black', //theme.palette.primary.main,
    //'textAlign': 'center',
}));

const SpacedLabel = styled('div')(({ theme }) => ({
    'margin': '10px 0px',
}));

const SpacedButton = styled(Button)(({ theme }) => ({
    'margin': '10px 0px',
}));

const HighlightedLabel = styled('div')(({ theme }) => ({
    'margin': '10px 0px',
    'font-size': '120%',
    'color': 'DarkSlateBlue',
}));

export {
    PageLayout, 
    GridPanel, 
    PageTitle, 
    SpacedLabel, 
    SpacedButton,
    HighlightedLabel,
}
