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
import { ButtonGeneral } from '../elements/controls/button-family'


function LogOutModal(props) {

    const { userStore } = useContext(GlobalContext);
    const formWidth = '280px';
    let navigate = useNavigate();  

    // submit button 

    const handleLogout = (event) => {
        event.preventDefault();
        console.log('log out button')

        userStore[1]({'name': '', 'status': 'guest'})
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

            <ST.FlexHorizontal>
                <ST.BaseText >
                    Ready to log out?
                </ST.BaseText>
            </ST.FlexHorizontal>

            <ST.FlexHorizontal>
                <ButtonGeneral onClick={ handleLogout }>
                    Log Out
                </ButtonGeneral>
            </ST.FlexHorizontal>

        </BaseModal>  
    );
}

LogOutModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default LogOutModal;
