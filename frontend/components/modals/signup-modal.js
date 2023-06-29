/**************************************************************************************************
SIGN UP MODAL
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { TextField, FormHelperText, Button } from '@mui/material';
import { Box, Stack } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import zxcvbn from 'zxcvbn';
import AxiosConfig from '../app-main/axios-config';
import BaseModal from './base-modal';
import * as ST from '../elements/styled-elements';
import PasswordField from '../elements/controls/password-field';
import FormSubmit from '../elements/controls/form-submit'


function SignUpModal(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formResult, setFormResult] = useState('');
    const formWidth = '300px';

    // clear the fields when the modal is closed

    useEffect(() => {
        if (!props.open) {
            setEmail('');
            setPassword('');
            setFormResult('');
        }
    }, [props.open])

    // create new user

    function createUser() {

        if (!isEmail(email)) {
            setFormResult('Email is not valid.');
            return;
        }
        if (zxcvbn(password).score < 2) {
            setFormResult('Password is too weak.');
            return;
        }

        function verifyEmailChain() {    
            AxiosConfig({
                method: 'POST',
                url: '/auth/send-verification',
                data: { 'email': email },
            }).then(responseData => {
                setFormResult('A verification email has been sent. Please check your spam folder.')
            }).catch(errorLs => {
                setFormResult(errorLs[errorLs.length -1]);
            });
        }

        AxiosConfig({
            method: 'POST',
            url: '/auth/create-user',
            data: { 'email': email, 'password': password },
        }).then(responseData => {
            setFormResult(responseData);
            verifyEmailChain();
        }).catch(errorLs => {
            setFormResult(errorLs[errorLs.length -1]);
        });
    }

    const handleSignup = (event) => {
        event.preventDefault();
        setFormResult(null);

        setTimeout(createUser, 500);
    }

    // just user verification

    function verifyEmail() {

        if (!isEmail(email)) {
            setFormResult('Email is not valid.');
            return;
        }

        AxiosConfig({
            method: 'POST',
            url: '/auth/send-verification',
            data: { 'email': email },
        }).then(responseData => {
            console.log(responseData);
            setFormResult(responseData);
        }).catch(errorLs => {
            setFormResult(errorLs[errorLs.length -1]);
        });
    }

    const handleVerify = (event) => {
        event.preventDefault();
        setFormResult(null);

        setTimeout(verifyEmail, 500);
    }

    // render

    return (
        <BaseModal
            open={props.open} 
            setOpen={props.setOpen} 
            title='Sign Up'
            width={formWidth}>

            <TextField 
                value={ email } onChange={(event) => { setEmail(event.target.value); }} 
                variant='outlined' label='Email' size='small' fullWidth/>

            <PasswordField 
                value={ password } 
                onChange={(event) => { setPassword(event.target.value); }}/>

            <FormSubmit 
                message={ formResult } 
                onSubmit={ handleSignup } />

            <ST.FlexHorizontal sx={{width: '100%', justifyContent: 'flex-end' }}>
                <ST.SmallButton onClick={ handleVerify }>
                    <ST.BaseText>Send Verification</ST.BaseText>
                </ST.SmallButton>
            </ST.FlexHorizontal>

        </BaseModal>  
    );
}

SignUpModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default SignUpModal;
