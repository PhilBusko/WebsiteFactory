/**************************************************************************************************
LOG IN MODAL
**************************************************************************************************/
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import * as TK from '../app-main/token-storage'
import { GlobalContext } from '../app-main/global-store'
import BaseModal from './base-modal';
import * as ST from '../elements/styled-elements'
import { StackForm, FormItem } from '../elements/stack-form'


function LogOutModal(props) {

    const { userStore } = useContext(GlobalContext);
    const formWidth = '280px';
    let navigate = useNavigate();  

    // submit button 

    const handleLogout = (event) => {
        event.preventDefault();

        userStore[1](null)
        TK.wipeTokens();

        // also closes this modal
        navigate('/');
    }

    // render

    return (
        <BaseModal
            open={props.open} 
            setOpen={props.setOpen} 
            title='Log Out'
            width={formWidth} >
            <StackForm width={formWidth}>

                <FormItem sx={{ 'display': 'flex', 'justifyContent': 'center' }}>
                    <ST.BaseText >
                        Are you ready to log out?
                    </ST.BaseText>
                </FormItem>

                <FormItem sx={{ 'display': 'flex', 'justifyContent': 'center' }}>
                    <Button type='submit' onClick={ handleLogout } variant='contained' sx={{minWidth: '80px'}}>Log Out</Button>
                </FormItem>

            </StackForm>
        </BaseModal>  
    );
}

LogOutModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default LogOutModal;
