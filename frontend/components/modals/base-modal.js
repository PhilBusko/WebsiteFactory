/**************************************************************************************************
BASE MODAL
**************************************************************************************************/
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { Close } from '@mui/icons-material'; 
import * as ST from '../elements/styled-elements';
import FormStack from '../elements/controls/form-stack';


const ModalWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '3px ridge orange',
    borderRadius: '4px', 
    outline: 'none',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 24px 24px 24px',
    background: 'white',
}));

const ModalTitle = styled('h2')(({ theme }) => ({
    width: '50%',
    margin: '6px 0px 0px 0px',
    '& .MuiTypography-root': { 
        fontSize: '32px',    
        lineHeight: '1.0', 
        whiteSpace: 'nowrap',
        fontVariant: 'small-caps',
    }, 
}));

const CloseButton = styled(ButtonBase)(({ theme }) => ({
    left: '16px', bottom: '8px',
    transform: 'scale(1.25)', 
    borderRadius: '50%', 
    color: 'crimson',
    '&:hover': {background: 'lightgrey',},
}));

function BaseModal(props) {

    return (<>
        <Backdrop open={props.open} sx={{ background: 'rgba(0,0,0,0.6)' }} />
        <Modal open={props.open}>
            <ModalWrapper>
                <FormStack width={props.width} padSize={ '25px' }>

                    <ST.FlexHorizontal sx={{ justifyContent: 'space-between' }} >
                        <ModalTitle>
                            <ST.TitleText>{ props.title }</ST.TitleText>
                        </ModalTitle>
                        <CloseButton onClick={() => { props.setOpen(false); }}>
                            <Close></Close>
                        </CloseButton>
                    </ST.FlexHorizontal>

                    { props.children }

                </FormStack>
            </ModalWrapper>
        </Modal>  
    </>);
}

BaseModal.defaultProps = {
    open: false,
    setOpen: () => {}, 
    width: '100px', 
    title: 'Modal Title',
};

export default BaseModal;
