/**************************************************************************************************
SELECT MULTIPLE 
**************************************************************************************************/
import { useState } from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import * as ST from  '../styled-elements';


const StyledLabel = styled(Box)(({ theme }) => ({
    '& .MuiFormLabel-root': { top: -12 },
    '& .MuiInputLabel-shrink': { 
        top: 0, 
        left: -3,                       // compensate for new font
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
    '&.Mui-selected': { background: ST.ControlBkgd, },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    padding: '0px 6px 0px 0px',
}));


function SelectMultiple(props) {

    const elemId = props.label.toLowerCase(); 
    const [selectAll, setSelectAll] = useState(false);

    const handleSelect = (event) => {
        const value = event.target.value;

        if (value.includes('ALL') && !selectAll) {
            setSelectAll(true);
            props.onChange(props.optionLs);
        }
        else if (value.includes('ALL') && selectAll) {
            setSelectAll(false);
            props.onChange([]);
        }
        else {
            props.onChange(value);

            if (value.length != props.optionLs.length)
                setSelectAll(false);
            else
                setSelectAll(true);
        }
    }

    return (
        <FormControl sx={{ width: props.width }}>
            <StyledLabel>
                <InputLabel id={elemId}>{props.label}</InputLabel>
            </StyledLabel>
            <StyledSelect 
                labelId={elemId}
                label={props.label}
                value={props.value}
                onChange={handleSelect}
                renderValue={(selected) => { return <ST.BaseText>{selected.join(', ')}</ST.BaseText> }}
                multiple >
                { !!props.hasSelectAll && 
                    <StyledItem key={0} value={'ALL'}>
                        <StyledCheckbox checked={ selectAll } />
                        <ST.BaseText>Select All</ST.BaseText>
                    </StyledItem>
                }
                { props.optionLs.map((option, idx) => (
                    <StyledItem key={idx+1} value={option}>
                        <StyledCheckbox checked={props.value.indexOf(option) > -1} />
                        <ST.BaseText>{option}</ST.BaseText>
                    </StyledItem>
                )) }
            </StyledSelect>
        </FormControl>
    );
}

SelectMultiple.defaultProps = {
    label: 'Select',
    width: '100%', 
    hasSelectAll: true, 
    optionLs: [],       // list of strings
    value: [], 
    onChange: () => {}, 
};

export default SelectMultiple;
