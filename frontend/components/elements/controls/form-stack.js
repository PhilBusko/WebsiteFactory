/**************************************************************************************************
FORM STACK 
**************************************************************************************************/
import { Stack } from '@mui/material';

function FormStack(props) {
    return (
        <form>
            <Stack 
                spacing={props.padSize} 
                alignItems='start' 
                sx={{ 'width': props.width }}>
                { props.children }
            </Stack>
        </form>
    );
}

FormStack.defaultProps = {
    'width': '300px',
    'padSize': '16px',
};

export default FormStack;
