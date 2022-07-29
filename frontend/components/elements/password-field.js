/**************************************************************************************************
PASSWORD FIELD
- having a confirm password input reduces the conversion rate
- better solution is to show/hide password
**************************************************************************************************/
import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordField(props) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField 
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

            variant='outlined' 
            label='Password' 
            size='small' 
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': {padding: '0'} }}
        />
    );
}

PasswordField.defaultProps = {
    value: '',
    onChange: () => {}, 
};

export default PasswordField;
