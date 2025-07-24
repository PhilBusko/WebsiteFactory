/**************************************************************************************************
FULL CHECKBOX
**************************************************************************************************/
import { FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as ST from '../styled-elements';


function FullCheckbox(props) {
    return (
        <FormControlLabel 
            label={ props.label } 
            labelPlacement='end'
            control={<Checkbox
                        checked={ props.isChecked }
                        onChange={(event) => { props.onChange(event.target.checked); }}
                        sx={{ 'padding': '0 8px' }}
                        style ={{ color: ST.ControlLabel }}
                    />}
            sx={{'& .MuiTypography-root': {
                fontFamily: ST.BaseFont, color: ST.ContentColor,
            } }}
        />
    );
}

FullCheckbox.defaultProps = {
    label: 'Checkbox',
    isChecked: false, 
    onChange: () => {}, 
};

export default FullCheckbox;
