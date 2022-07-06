/**************************************************************************************************
LOG IN MODAL
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import BaseModal from './base-modal';


function LogInModal(props) {


    return (
        <BaseModal
            open={props.open} 
            setOpen={props.setOpen} 
            title='Log In Window'
            width='300px'
        >
            <Box sx={{ background: 'lightblue' }}>
                log in modal 
            </Box>
        </BaseModal>  
    );
}

LogInModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
};

export default LogInModal;
