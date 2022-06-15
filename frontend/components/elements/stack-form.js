/**************************************************************************************************
STACK FORM
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const FormItem = styled('div')(({ theme }) => ({
  'textAlign': 'center',
  'back ground': 'lightblue', 
}));

function StackForm(props) {

    const padSize = '16px';

    return (
        <form>
            <Stack spacing={padSize}
                sx={{ 'padding': padSize, 'back ground': 'lightyellow' }}>
                { props.children }
            </Stack>
        </form>
    );
}

export { StackForm, FormItem };
