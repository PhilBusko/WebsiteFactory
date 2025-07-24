/**************************************************************************************************
TEXT INPUT
**************************************************************************************************/
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as ST from '../styled-elements';


const StyledText = styled(TextField)(({ theme }) => ({
    '& input': { padding: '4px 8px', },
    '& label': { top: '-12px', },
    '& label.MuiInputLabel-shrink': { top: '0px' },
    background: ST.ControlBkgd,
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

            inputProps={{style: {fontFamily: ST.BaseFont, color: ST.ContentColor}}}
            InputLabelProps={{style: {fontFamily: ST.BaseFont, color: ST.ControlLabel}}}
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
