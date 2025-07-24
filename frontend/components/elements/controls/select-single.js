/**************************************************************************************************
SELECT SINGLE 
**************************************************************************************************/

import { Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { styled } from '@mui/material/styles';
import * as ST from  '../styled-elements';


const StyledLabel = styled(Box)(({ theme }) => ({
    '& .MuiFormLabel-root': { top: -12 },
    '& .MuiInputLabel-shrink': { 
        top: 0, 
        left: -2,                       // compensate for new font
    },
    '& .MuiInputLabel-root': {
        fontFamily: ST.BaseFont,        // works but not for shrunk label spacing
        color: ST.ControlLabel,
    },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    background: ST.ControlBkgd,
    '& .MuiSelect-select': { padding: '6px 0px 4px 8px'},
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
    background: ST.ControlBkgd,
    '&:hover': { background: 'mintcream', },
    '&.Mui-selected': { background: 'lightgrey', },
}));

function SelectSingle(props) {

    const elemId = props.label.toLowerCase(); 

    return (<>
        { props.optionLs.length > 0 && 
            <FormControl sx={{ width: props.width }}>

                <StyledLabel>
                    <InputLabel id={elemId} >
                         {props.label} 
                    </InputLabel>
                </StyledLabel>

                <StyledSelect 
                    labelId={elemId} 
                    label={props.label}

                    value={props.value} 
                    onChange={(event) => {props.onChange(event.target.value);}}
                >
                    { !!props.hasNone &&
                        <StyledItem key={0} value={''}>
                            <ST.BaseText><em>None</em></ST.BaseText>
                        </StyledItem>
                    }
                    { props.optionLs.map((option, idx) => (
                        <StyledItem key={idx+1} value={option}>
                            <ST.BaseText>{option}</ST.BaseText>
                        </StyledItem>
                    )) }
                </StyledSelect>

            </FormControl>
        }
        { props.optionLs.length == 0 && 
            <Box sx={{ height: '31px' }}>
                <ST.BaseText>Loading Options ...</ST.BaseText>
            </Box>
        }
    </>);
}

SelectSingle.defaultProps = {
    label: 'Select',
    width: '100%',
    hasNone: true, 
    optionLs: [],       // list of strings
    value: '', 
    onChange: () => {}, 
};

export default SelectSingle;
