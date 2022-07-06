/**************************************************************************************************
BASE MODAL
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import { Close } from '@mui/icons-material'; 
import * as ST from '../elements/styled-elements'


const ModalWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '3px ridge SlateBlue ',
    borderRadius: '4px', 

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4px 6px',
    background: 'white',
}));

const ModalTitle = styled('h2')(({ theme }) => ({
    margin: '0px',
    borderBottom: '2px solid grey',
    color: 'black', //theme.palette.primary.main,
}));

const CloseButton = styled(ButtonBase)(({ theme }) => ({
    transform: 'scale(1.3)', 
    borderRadius: '50%', 
    color: 'crimson',

    '&:hover': {
        //color: 'black',
        background: 'lightgrey',
    }
}));

function BaseModal(props) {

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Modal open={props.open}>
            <ModalWrapper sx={{ width: props.width }}>

                <ST.BoxSpaceBetween sx={{ width: '100%',  }}>
                    <ModalTitle>{props.title}</ModalTitle>
                    <CloseButton onClick={handleClose}>
                        <Close></Close>
                    </CloseButton>
                </ST.BoxSpaceBetween>

                <Box>{ props.children }</Box>
                
            </ModalWrapper>
        </Modal>  
    );
}

BaseModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
    width: '100px', 
    title: 'Modal Title',
};

export default BaseModal;
