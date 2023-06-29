/**************************************************************************************************
FORM SUBMIT
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { FormHelperText, Button } from '@mui/material';
import * as ST from '../styled-elements';


function FormSubmit(props) {

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
            <Box sx={{ paddingRight: '6px' }}>
                <Button type='submit' onClick={ props.onSubmit } variant='contained' sx={{minWidth: '80px'}}>
                    <ST.BaseText>{props.buttonLabel}</ST.BaseText>
                </Button>
            </Box>
        </ST.FlexHorizontal>
    );
}

FormSubmit.defaultProps = {
    message: null,  // '' or []
    onSubmit: () => {}, 
    buttonLabel: 'Submit', 
};

export default FormSubmit;
