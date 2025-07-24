/**************************************************************************************************
BUTTON FAMILY
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Box, ButtonBase, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as ST from '../styled-elements';


const buttonColor = '#1976d2';

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    background: buttonColor,
    padding: '5px 15px',
    borderRadius: '6px',

    '& .MuiTypography-root': {
        fontSize: '18px',
        color: 'white',
        fontVariant: 'small-caps',
    },
    '&:hover': { background: '#104d89', },
}));


// BUTTON GENERAL

function ButtonGeneral(props) {

    return (
        <StyledButton onClick={ props.onClick }>
            <ST.SpecialText>{ props.buttonLabel }</ST.SpecialText>
        </StyledButton>
    );
}

ButtonGeneral.defaultProps = {
    buttonLabel: 'Ok Go', 
    onClick: () => {}, 
};


// BUTTON SUBMIT

function ButtonSubmit(props) {

    const [messageLs, setMessageLs] = useState(null);

    useEffect(() => {
        if (typeof(props.message) == 'string') {
            setMessageLs([props.message]);
        }
        else {
            setMessageLs(props.message);
        }
    }, [props.message]);

    return (
        <ST.FlexHorizontal sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{  padding: '0px', borderRadius: '3px',
                        background: (!!messageLs ? 'white' : 'none'), }}>
                { !!messageLs && messageLs.map( (msg, idx) => 
                    <Box key={idx}>
                        <FormHelperText value={msg} sx={{margin: '0px'}}>
                            {msg}
                        </FormHelperText>
                    </Box> 
                )}
            </Box>
            <Box sx={{ padding: '0px 6px' }}>
                <StyledButton onClick={ props.onSubmit }>
                    <ST.SpecialText>{ props.buttonLabel }</ST.SpecialText>
                </StyledButton>
            </Box>
        </ST.FlexHorizontal>
    );
}

ButtonSubmit.defaultProps = {
    buttonLabel: 'Submit', 
    message: null,
    onSubmit: () => {}, 
};


// BUTTON SMALL

function ButtonSmall(props) {

    const SmallBase = styled(ButtonBase)(({ theme }) => ({
        border: `2px solid ${buttonColor}`,
        borderRadius: '4px',
        '& .MuiTypography-root': {
            width: props.textWidth,
            padding: '2px 5px',
            fontSize: '15px',
            color: buttonColor,
        },
        '&:hover': {
            '& .MuiTypography-root': {
                fontWeight: 'bold',
            },
        },
    }));

    return (
        <SmallBase onClick={ props.onClick } variant='contained'>
            <ST.SpecialText>{ props.buttonLabel }</ST.SpecialText>
        </SmallBase>
    );
}

ButtonSmall.defaultProps = {
    buttonLabel: 'Ok Go',
    textWidth: '100px',
    onClick: () => {}, 
};


export {
    ButtonGeneral,
    ButtonSubmit,
    ButtonSmall,
}
