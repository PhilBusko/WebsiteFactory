/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { ButtonBase } from '@mui/material';
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const BoxSpaceBetween = styled(Box)(({ theme }) => ({
    width: '100%',
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

const SmallButton = styled(ButtonBase)(({ theme }) => ({
    '& .MuiTypography-root': { 
        fontSize: '90%',    
        color: '#1e73be',
        textDecoration: 'underline',
    }, 
    //'&:hover': {fontWeight: '600'}, 
}));


// FONTS

const BaseText = styled(Typography)(({ theme }) => ({
    fontFamily: 'sans-serif', 
    lineHeight: 1.1,
}));

const HighlightText = styled(BaseText)(({ theme }) => ({
    fontSize: '110%',
    color: '#1e73be',
}));

const SpecialText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif',
}));

const HighlightSpecial = styled(SpecialText)(({ theme }) => ({
    fontSize: '110%',
    color: '#1e73be',
}));


// EXPORTS

export {
    GridPage, 
    GridItemCenter, 
    BoxCenter, 
    BoxSpaceBetween,

    TitleGroup, 
    SmallButton, 

    BaseText,
    HighlightText,
    SpecialText, 
    HighlightSpecial, 
}
