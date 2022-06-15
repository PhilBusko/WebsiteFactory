/**************************************************************************************************
STYLED ELEMENTS
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const PageTitle = styled('h1')(({ theme }) => ({
    'margin': '10px 0px',
    'borderBottom': '2px solid grey',
    'color': 'black', //theme.palette.primary.main,
}));


export { PageTitle,  }
