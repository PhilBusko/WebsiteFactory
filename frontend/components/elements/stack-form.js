/**************************************************************************************************
STACK FORM
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { Card, Stack } from '@mui/material';

const FormItem = styled('div')(({ theme }) => ({
  'padding': '10px',
  'textAlign': 'center',
  //'background': 'lightblue', 
}));

function StackForm(props) {
    return (
        <form sx={{ 'wid th': '60%' }}>
            <Card elevation={3}>
                <Stack spacing={1} padding='6px' sx={{ 'wid th': '80%', 'back ground': 'lightgrey' }}>
                    { props.children }
                </Stack>
            </Card>
        </form>
    );
}

export { StackForm, FormItem };
