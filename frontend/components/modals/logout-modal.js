/**************************************************************************************************
LOG OUT MODAL
**************************************************************************************************/
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import * as TK from '../app-main/token-storage'
import { GlobalContext } from '../app-main/global-store'
import BaseModal from './base-modal';
import * as ST from '../elements/styled-elements'


function LogOutModal(props) {

    const { userStore } = useContext(GlobalContext);
    const formWidth = '280px';
    let navigate = useNavigate();  

    // submit button 

    const handleLogout = (event) => {
        event.preventDefault();

        userStore[1](null)
        TK.wipeTokens();

        props.setOpen(false);
        navigate('/');
    }

    // render

    return (
        <BaseModal
            open={props.open} 
            setOpen={props.setOpen} 
            title='Log Out'
            width={formWidth} >

            <ST.BoxCenter sx={{ 'display': 'flex', 'justifyContent': 'center' }}>
                <ST.BaseText >
                    Are you ready to log out?
                </ST.BaseText>
            </ST.BoxCenter>

            <ST.BoxCenter>
                <Button type='submit' onClick={ handleLogout } variant='contained' sx={{minWidth: '80px'}}>
                    Log Out
                </Button>
            </ST.BoxCenter>

        </BaseModal>  
    );
}

LogOutModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default LogOutModal;
