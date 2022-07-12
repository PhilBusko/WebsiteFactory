/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { Box, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


// SPACING

const GridPage = styled(Grid)(({ theme }) => ({
    width: '100%',
    margin: '0px',
    padding: '0px',
    [theme.breakpoints.up('md')]: {padding: '0px 200px 0px 0px'},
}));

const GridItemCenter = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const BoxCenter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const BoxSpaceBetween = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const TitleGroup = styled('h1')(({ theme }) => ({
    margin: '0px',
    paddingRight: '20px', 
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
    fontSize: '110%',
    color: 'DarkSlateBlue',
}));

const SpecialText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif',
}));


// EXPORTS

export {
    GridPage, 
    GridItemCenter, 
    BoxCenter, 
    BoxSpaceBetween,
    TitleGroup, 

    BaseText,
    HighlightText,
    SpecialText, 
}
