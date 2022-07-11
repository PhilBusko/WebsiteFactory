/**************************************************************************************************
FORGOT PASSWORD MODAL
**************************************************************************************************/
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, FormHelperText, Button } from '@mui/material';
import AxiosConfig from '../app-main/axios-config'
import * as TK from '../app-main/token-storage'
import { GlobalContext } from '../app-main/global-store'
import BaseModal from './base-modal';
import { StackForm, FormItem } from '../elements/stack-form'


function PasswordModal(props) {

    const { userStore } = useContext(GlobalContext);
    const formWidth = '280px';
    let navigate = useNavigate();  

    // input controls

    const [email, setEmail] = useState('zetaszaur@gmail.com');
    const handleEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const [password, setPassword] = useState('GHIJ654');
    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }



    // submit button 

    const [formResult, setFormResult] = useState('');

    function isFormValid() {
        var valid = true;

        if (email.length == 0 || password.length == 0) {
            setFormResult('Credentials can\'t be blank');
            valid = false;
        }

        return valid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormResult(null);

        if (!isFormValid()) return;

        const credentials = {
            'email': email, 
            'password': password,
        };

        AxiosConfig({
            method: 'POST',
            url: '/auth/click-login',
            data: credentials,
        }).then(responseData => {
            userStore[1](responseData.user || 'user not set')
            TK.storeAccessToken(responseData.access);
            TK.storeRefreshToken(responseData.refresh);
            setEmail('');
            setPassword('');
            setFormResult('');
            navigate('/account/');
        }).catch(errorLs => {
            TK.wipeTokens();
            setFormResult(errorLs[errorLs.length -1]);
        });
    }

    // render

    return (
        <BaseModal
            open={props.open} 
            setOpen={props.setOpen} 
            title='Reset Password'
            width={formWidth} >
            <StackForm width={formWidth}>

                <FormItem >
                    <TextField 
                        value={ email } onChange={ handleEmail } 
                        variant='outlined' label='Email' size='small' fullWidth/>
                </FormItem>

                <FormItem >
                    <TextField 
                        value={ password } onChange={ handlePassword }  
                        type='password' inputProps={{ autoComplete: 'new-password' }}
                        variant='outlined' label='Password' size='small' fullWidth/>
                </FormItem>

                <FormItem sx={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                    <FormHelperText value={formResult} >{formResult}</FormHelperText>
                    <Button type='submit' onClick={ handleSubmit } variant='contained' sx={{minWidth: '80px'}} >Log In</Button>
                </FormItem>

            </StackForm>
        </BaseModal>  
    );
}

PasswordModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default PasswordModal;
