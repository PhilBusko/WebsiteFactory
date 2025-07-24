/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { Box, Grid, Card } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';


// THEME

const AppTheme = createTheme({});

const BaseFont = 'Lexend';
const TitleFont = 'Domino Brick';
const LinkFont = 'LEGO BRIX';
const SpecialFont = 'Cloud';

const ContentColor = 'blue';
const ControlLabel = 'darkgreen';
const ControlBkgd = 'lavender';


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
        fontVariant: 'small-caps',
    }, 
}));

const ContentCard = styled(Card)(({ theme }) => ({
    padding: '16px', 
    overflow: 'visible', 
}));


// FONTS

const BaseText = styled(Typography)(({ theme }) => ({
    fontFamily: BaseFont, 
    fontSize: '16px',
    lineHeight: 1.3,
    color: ContentColor,
}));

const TitleText = styled(Typography)(({ theme }) => ({
    fontFamily: TitleFont,
    fontSize: '24px',
}));

const LinkText = styled(Typography)(({ theme }) => ({
    fontFamily: LinkFont,
    fontSize: '14px',
}));

const SpecialText = styled(Typography)(({ theme }) => ({
    fontFamily: SpecialFont,
    fontSize: '16px',
    color: ContentColor,
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

    BaseFont,
    TitleFont,
    LinkFont,
    SpecialFont,

    ContentColor,
    ControlLabel,
    ControlBkgd,

    BaseText,
    TitleText,
    LinkText, 
    SpecialText,
}
