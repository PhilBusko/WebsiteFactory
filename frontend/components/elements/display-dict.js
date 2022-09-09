/**************************************************************************************************
DISPLAY DICTIONARY
**************************************************************************************************/
import { styled } from '@mui/material/styles'
import * as ST from '../elements/styled-elements';

function DisplayDict(props) {

    const DisplayTable = styled('table')(({ theme }) => ({
        maxWidth: '280px',
        padding: '4px 6px', 
        border: '1px solid black',
        background: 'white',
        '& tr': {
            '& td:nth-of-type(1)': {paddingRight: '6px'},
        },
    }));

    return (<>
        {Object.keys(props.infoDx).length > 0 &&
            <DisplayTable>
                <tbody>
                    { Object.keys(props.infoDx).map((key, idx) => ( 
                        <tr key={idx}>
                            <td>
                                <ST.BaseText><b>{key}:</b></ST.BaseText>
                            </td>
                            <td>
                                <ST.BaseText>{props.infoDx[key]}</ST.BaseText>
                            </td>
                        </tr> 
                    )) }
                </tbody>
            </DisplayTable>
        }
        {Object.keys(props.infoDx).length == 0 &&
            <DisplayTable sx={{ width: '220px', height: '160px' }}>
                <tbody>
                    <tr>
                        <td>
                            <ST.BaseText sx={{textAlign: 'center'}}>No Data</ST.BaseText>
                        </td>
                    </tr> 
                </tbody>
            </DisplayTable>
        }
    </>);
}

DisplayDict.defaultProps = {
    infoDx: {},
};

export default DisplayDict;
