/**************************************************************************************************
SIMPLE TABLE
**************************************************************************************************/
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid';
import * as ST from '../elements/styled-elements';


const StyledTable = styled(DataGrid)(({ theme }) => ({
    border: '1px solid black',
    background: 'white', 

    // remove outline on click
    '& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
        display: 'none', 
    },
    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
        outline: 'none !important',
    },
    '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
        outline: 'none !important',
    },
}));


function SimpleTable(props) {

    // add id for data grid

    for (var d = 0; d < props.dataLs.length; d++) { 
        props.dataLs[d]['id'] = d; 
    }

    // create the column definitions

    var colDefs = [];
    var colNames = ( props.dataLs.length > 0 ? Object.keys(props.dataLs[0]) : [] );
    var tableWidth = 0;

    for (var c = 0; c < colNames.length; c++) { 
        if (colNames[c] == 'id') continue;
        var isNumber = typeof(props.dataLs[0][colNames[c]]) == 'number';
        var longString = props.dataLs[0][colNames[c]].toString().length > 18;

        var colWidth = 110;
        if (isNumber) colWidth = 80;
        if (longString) colWidth = 210;
        tableWidth += colWidth * 1.06;
        //if (tableWidth > 280) tableWidth = 280;

        var newCol = {
            field: colNames[c],
            headerName: colNames[c],
            headerAlign: ( isNumber ? 'center' : 'left' ),
            align: ( isNumber ? 'center' : 'left' ),
            sortable: false,
            renderCell: (params) => (<ST.BaseText> { params.value } </ST.BaseText>), 
            width: colWidth, 
        }
        colDefs.push(newCol);
    }

    const rowsBeforeScroll = 12;

    return (
        <Box >
            <StyledTable
                rows={props.dataLs}
                columns={colDefs}
                sx={{ width: tableWidth, height: ( props.dataLs.length <= rowsBeforeScroll ? 'auto' : '560px' )}}
                autoHeight={ props.dataLs.length <= rowsBeforeScroll }
                density='compact'           // applies to header 
                getRowHeight={() => ( props.dataLs.length <= rowsBeforeScroll ? 36 : 'auto' )}  // applies to rows, 36px is compact height
                disableColumnMenu           // disable menu on each header
                hideFooter
                disableSelectionOnClick     // keeps row from turning blue on select
            />
        </Box>
    );
}

SimpleTable.defaultProps = {
    dataLs: [],
};

export default SimpleTable;
