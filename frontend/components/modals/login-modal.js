/**************************************************************************************************
LOG IN MODAL
**************************************************************************************************/
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import AxiosConfig from '../app-main/axios-config';
import * as TK from '../app-main/token-storage';
import { GlobalContext } from '../app-main/global-store';
import BaseModal from './base-modal';
import * as ST from '../elements/styled-elements';
import PasswordField from '../elements/controls/password-field';
import FormSubmit from '../elements/controls/form-submit'


function LogInModal(props) {

    const { userStore } = useContext(GlobalContext);
    const formWidth = '280px';
    let navigate = useNavigate();  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formResult, setFormResult] = useState('');

    // clear the fields when the modal is closed

    useEffect(() => {
        if (!props.open) {
            setEmail('');
            setPassword('');
            setFormResult('');
        }
    }, [props.open])

    // submit button 

    function loginUser() {

        if (!isEmail(email)) {
            setFormResult('Email is not valid.');
            return;
        }
        if (password.length == 0) {
            setFormResult('Password can\'t be blank');
            return;
        }

        AxiosConfig({
            method: 'POST',
            url: '/auth/click-login',
            data: { 'email': email, 'password': password },
        }).then(responseData => {
            const newUser = {
                'name': responseData.user,
                'status': responseData.admin ? 'admin' : 'user',
            }
            userStore[1](newUser);
            TK.storeAccessToken(responseData.access);
            TK.storeRefreshToken(responseData.refresh);
            setEmail('');
            setPassword('');
            setFormResult('');
            props.setOpen(false);
            navigate('/account/');
        }).catch(errorLs => {
            TK.wipeTokens();
            setFormResult(errorLs[errorLs.length -1]);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormResult(null);

        setTimeout(loginUser, 500);
    }

    // forgot password

    function forgotPassword() {

        if (!isEmail(email)) {
            setFormResult('Email is not valid.');
            return;
        }

        AxiosConfig({
            method: 'POST',
            url: '/auth/forgot-password',
            data: { 'email': email },
        }).then(responseData => {
            setFormResult(responseData);
        }).catch(errorLs => {
            setFormResult(errorLs[errorLs.length -1]);
        });
    }

    const handleForgot = (event) => {
        event.preventDefault();
        setFormResult(null);

        setTimeout(forgotPassword, 500);
    }

    // render

    return (
        <BaseModal
            open={props.open} 
            setOpen={props.setOpen} 
            title='Log In'
            width={formWidth} >

            <TextField 
                value={ email } onChange={(event) => { setEmail(event.target.value); }} 
                variant='outlined' label='Email' size='small' fullWidth/>

            <PasswordField 
                value={ password } 
                onChange={(event) => { setPassword(event.target.value); }}/>

            <ST.SmallButton onClick={ handleForgot }>
                <ST.BaseText>Forgot Password</ST.BaseText>
            </ST.SmallButton>

            <FormSubmit message={ formResult } 
                onSubmit={ handleSubmit }/>

        </BaseModal>  
    );
}

LogInModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default LogInModal;
