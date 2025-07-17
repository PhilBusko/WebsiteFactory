/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { ButtonBase } from '@mui/material';
import { Box, Grid, Card } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';


// THEME

const AppTheme = createTheme({});


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
        fontSize: '34px',
        // fontWeight: 'bold',
        textTransform: 'uppercase',
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
    fontSize: '16px',
    lineHeight: 1.1,
}));

const TitleText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Domino Brick',
    fontSize: '24px',
    // fontFamily: 'Legothick',
}));

const LinkText = styled(Typography)(({ theme }) => ({
    fontFamily: 'LEGO BRIX',
    fontSize: '14px',
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
    TitleText,
    LinkText, 
}
