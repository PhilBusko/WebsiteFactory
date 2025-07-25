/**************************************************************************************************
PAGINATED TABLE
**************************************************************************************************/
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid';
import * as ST from '../styled-elements';


const StyledTable = styled(DataGrid)(({ theme }) => ({
    border: '1px solid black',
    background: ST.ControlBkgd, 

    // header font
    '& .MuiDataGrid-columnHeaders': {
        fontFamily: ST.SpecialFont,
        fontSize: '18px',
        fontWeight: 'bold',
        color: ST.ContentColor,
    },

    // footer font
    '& .MuiTablePagination-root .MuiTablePagination-displayedRows': {
        fontFamily: ST.SpecialFont,
        color: ST.ContentColor,
    },
    '& .MuiSvgIcon-root': {
        color: ST.ContentColor,
    },

    // remove outline on click
    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
        outline: 'none !important',
    },
    '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
        outline: 'none !important',
    },
}));

const EmptyTable = styled(ST.FlexHorizontal)(({ theme }) => ({
    width: '460px',
    height: '200px',
    border: '1px solid black',
    borderRadius: '2px',
    background: ST.ControlBkgd, 
}));

function PaginatedTable(props) {

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

        var longString = false;
        for (var r = 0; r < 10; r++) { 
            if (props.dataLs[r][colNames[c]].toString().length > 18)
                longString = true;
        }

        var colWidth = 110;
        if (isNumber) colWidth = 80;
        if (longString) colWidth = 210;
        tableWidth += colWidth * 1.01;

        if (colNames[c] == 'SetNo') colWidth = 90;
        if (colNames[c] == 'Minifigs') colWidth = 90;

        var newCol = {
            field: colNames[c],
            headerName: colNames[c],
            headerAlign: ( isNumber ? 'center' : 'left' ),
            align: ( isNumber ? 'center' : 'left' ),
            sortable: false,
            renderCell: (params) => (<ST.SpecialText>{ params.value }</ST.SpecialText>), 
            width: colWidth, 
        }
        colDefs.push(newCol);
    }

    // render

    return (<>
        { props.dataLs.length > 0 &&
            <StyledTable
                rows={props.dataLs}
                columns={colDefs}
                sx={{ width: tableWidth }}
                pageSize={12}
                autoHeight={true}
                density='compact'            
                disableColumnMenu            
                disableSelectionOnClick     
            />
        }
        { props.dataLs.length === 0 &&
            <EmptyTable sx={{ width: props.width, }}>
                <ST.SpecialText sx={{fontSize: '20px'}}>No Data</ST.SpecialText>
            </EmptyTable>
        }
    </>);
}

PaginatedTable.defaultProps = {
    width: '400px',
    dataLs: [],
};

export default PaginatedTable;