/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { ButtonBase } from '@mui/material';
import { Box, Grid, Card } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';

// import Legothick from '../assets/Legothick.ttf';


// THEME

const AppTheme = createTheme({
    overrides: {
        // MuiCssBaseline: {
        //     '@global': { '@font-face': [ Legothick ] }, 
        // },
    },
});


// SPACING

const GridPage = styled(Grid)(({ theme }) => ({
    width: '100%',
    margin: '0px',
    padding: '0px',
    [theme.breakpoints.up('md')]: {padding: '0px 200px 0px 0px'},   // T R B L
}));

const GridItemCenter = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
}));

const FlexHorizontal = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',       // default
    justifyContent: 'center',   // 'space-evenly',
    alignItems: 'center',
}));

const FlexVertical = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',    // 'space-evenly', 'space-between'
    alignItems: 'center',
}));


// FORMATTING

const TitleGroup = styled('h1')(({ theme }) => ({
    margin: '0px',
    paddingRight: '20px', 
    borderBottom: '2px solid rgb(150,150,150)',
    '& .MuiTypography-root': { 
        fontSize: '80%',    // h1 default is 32pt
        lineHeight: '1.2', 
    }, 
}));

const ContentCard = styled(Card)(({ theme }) => ({
    padding: '16px', 
    overflow: 'visible', 
}));

const SmallButton = styled(ButtonBase)(({ theme }) => ({
    '& .MuiTypography-root': { 
        fontSize: '100%',    
        color: '#1e73be',
        textDecoration: 'underline',
        '&:hover': {fontWeight: '600'},
    }, 
}));


// FONTS

const BaseText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif', 
    lineHeight: 1.1,
}));

const HighlightText = styled(BaseText)(({ theme }) => ({
    fontSize: '110%',
    fontWeight: 'bold',
}));

const SpecialText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Legothick',
    // fontFamily: 'Belanosima',
}));

const HighlightSpecial = styled(SpecialText)(({ theme }) => ({
    fontSize: '110%',
    color: '#1e73be',
}));


// EXPORTS

export {
    AppTheme,

    GridPage, 
    GridItemCenter,
    FlexHorizontal,
    FlexVertical,

    TitleGroup, 
    ContentCard, 
    SmallButton, 

    BaseText,
    HighlightText,
    SpecialText, 
    HighlightSpecial, 
}
