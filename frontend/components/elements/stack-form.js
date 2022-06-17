/**************************************************************************************************
STACK FORM
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const FormItem = styled('div')(({ theme }) => ({
  'textAlign': 'left',
  'back ground': 'lightblue', 
}));

function StackForm(props) {
    return (
        <form>
            <Stack spacing={props.padSize} 
                sx={{ 'padding': props.padSize, 'width': props.width }}>
                { props.children }
            </Stack>
        </form>
    );
}

StackForm.defaultProps = {
    'width': '300px',
    'padSize': '16px',
};

export { StackForm, FormItem };
