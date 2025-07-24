/**************************************************************************************************
READ ONLY AREA
**************************************************************************************************/
import { Box } from '@mui/material';
import * as ST from  '../styled-elements';


function ReadOnlyArea(props) {

    const elemId = props.label.toLowerCase().replace(' ', '');

    return (
        <ST.FlexVertical id={elemId} 
                sx={{ width: props.width, alignItems: 'start', background: 'white', borderRadius: '3px', }}>
            <Box sx={{ padding: '6px 0px 6px 10px' }}>   
                <ST.BaseText><b><u>{props.label}</u></b></ST.BaseText>
            </Box>
            <Box sx={{ 
                padding: '0px 10px 6px 10px', 
                color: (props.mode !== 'error' ? 'rgba(0, 0, 0, 0.87)' : 'crimson') 
            }}>
                { props.valueLs.map( (val, idx) => 
                    <ST.BaseText key={idx}>{val}</ST.BaseText>
                )}
            </Box>
        </ST.FlexVertical>
    );
}

ReadOnlyArea.defaultProps = {
    label: 'Label',
    valueLs: '', 
    width: '100%', 
    mode: 'normal',     // error
};

export default ReadOnlyArea;
