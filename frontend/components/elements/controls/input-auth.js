/**************************************************************************************************
AUTH INPUT
- having a confirm password input reduces the conversion rate
- better solution is to show/hide password
**************************************************************************************************/
import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as ST from '../styled-elements';


const StyledText = styled(TextField)(({ theme }) => ({
    background: ST.ControlBkgd,
}));


// EMAIL FIELD

function EmailInput(props) {

    return (
        <StyledText 
            value={ props.value } 
            onChange={ props.onChange }  

            label='Email' 
            variant='outlined'
            size='medium'
            fullWidth

            inputProps={{style: {fontFamily: ST.BaseFont, color: ST.ContentColor, fontSize: '18px'}}}
            InputLabelProps={{style: {fontFamily: ST.BaseFont, color: ST.ControlLabel}}}
        />
    );
}

EmailInput.defaultProps = {
    value: '',
    onChange: () => {}, 
};


// PASSWORD INPUT

function PasswordInput(props) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <StyledText 
            value={ props.value } 
            onChange={ props.onChange }  
            type={showPassword ? 'text' : 'password'}

            InputProps={{ 
                autoComplete: 'new-password',    // disable google autofill
                endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={() => { setShowPassword(!showPassword) }}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                ),
            }}

            label='Password' 
            variant='outlined' 
            size='medium' 
            fullWidth

            inputProps={{style: {fontFamily: ST.BaseFont, color: ST.ContentColor, fontSize: '18px'}}}
            InputLabelProps={{style: {fontFamily: ST.BaseFont, color: ST.ControlLabel}}}
        />
    );
}

PasswordInput.defaultProps = {
    value: '',
    onChange: () => {}, 
};


export {
    EmailInput,
    PasswordInput,
}
