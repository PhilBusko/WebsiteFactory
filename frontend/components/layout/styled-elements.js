/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

const PageTitle = styled('h1')(({ theme }) => ({
    'margin': '10px 0px',
    'borderBottom': '2px solid grey',
    'color': 'black', //theme.palette.primary.main,
    //'textAlign': 'center',
 }));

const GridPanel = styled(Grid)(({ theme }) => ({
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
}));

export { PageTitle, GridPanel }
