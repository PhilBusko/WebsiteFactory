/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { Box, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


// SPACING

const GridItemCenter = styled(Grid)(({ theme }) => ({
    'display': 'flex',
    'justifyContent': 'center',
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

const TitleGroup = styled('h1')(({ theme }) => ({
    margin: '0px',
    borderBottom: '2px solid rgb(150,150,150)',
    '& .MuiTypography-root': { 
        fontSize: '80%',    // h1 default is 32pt
        lineHeight: '1.2', 
    }, 
}));


// FONTS

const BaseText = styled(Typography)(({ theme }) => ({
    fontFamily: 'sans-serif', 
}));

const HighlightText = styled('BaseText')(({ theme }) => ({
    'font-size': '110%',
    'color': 'DarkSlateBlue',
}));

const SpecialText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif',
}));


// EXPORTS

export {
    GridItemCenter, 
    BoxCenter, 
    BoxSpaceBetween,
    TitleGroup, 

    BaseText,
    HighlightText,
    SpecialText, 
}
