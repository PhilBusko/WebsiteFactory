/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { Button } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';


const GridItemCenter = styled(Grid)(({ theme }) => ({
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
}));

const GridItemVertical = styled(Grid)(({ theme }) => ({
    'display': 'flex',
    'flexDirection': 'column', 
    'justifyContent': 'space-between',
    'alignItems': 'center',
}));

const BoxCenter = styled(Box)(({ theme }) => ({
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
}));

const BoxSpaceBetween = styled(Box)(({ theme }) => ({
    'display': 'flex',
    'justifyContent': 'space-between',
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

const HighlightedLabel = styled('div')(({ theme }) => ({
    'margin': '10px 0px',
    'font-size': '110%',
    'color': 'DarkSlateBlue',
}));

const SpacedButton = styled(Button)(({ theme }) => ({
    'margin': '10px 0px',
}));

export {
    GridItemCenter, 
    GridItemVertical, 
    BoxCenter, 
    BoxSpaceBetween,
    PageTitle, 
    SpacedLabel, 
    HighlightedLabel,
    SpacedButton,
}
