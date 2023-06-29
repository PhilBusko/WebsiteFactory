/**************************************************************************************************
TEXT INPUT
**************************************************************************************************/
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledText = styled(TextField)(({ theme }) => ({
    '& input': { padding: '4px 8px', },
    '& label': { top: '-12px', },
    '& label.MuiInputLabel-shrink': { top: '0px', },
    '& .MuiInputBase-root': { background: 'white', },
}));

function TextInput(props) {

    const elemId = props.label.toLowerCase().replace(' ', '');

    return (
        <StyledText 
            id={elemId}
            label={props.label}
            variant='outlined' 
            sx={{width: props.width}} 

            value={ props.value } 
            onChange={(event) => { props.onChange(event.target.value); }}
            error={ !!props.errorMsg }
            helperText={ props.errorMsg }
        />
    );
}

TextInput.defaultProps = {
    label: 'Input',
    width: '100%', 
    value: '', 
    onChange: () => {}, 
    errorMsg: '',
};

export default TextInput;
