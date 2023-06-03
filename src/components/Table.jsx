import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store/tableStock/tableStockSlice';
import { mapItemsToAssign } from '../utils/map';

const Table = ({cols, rows, numberPage, currentPage, loading}) => {
    const dispatch = useDispatch();
    const { stockItemsSelected } = useSelector(state => state.assignStock )
    const handleChange = (e, value) => {
        dispatch(setCurrentPage(value))
    }
    const handleItemsSelected = (items) => {
        dispatch(mapItemsToAssign(items))
    }
    const custom = () => {
     return <Pagination count={numberPage} page={currentPage} color="primary" onChange={handleChange} />
    }
    return (
        <div style={{ height: '80vh', backgroundColor: 'rgba(230, 235, 240, .7)' }}>
            <DataGrid
                loading={loading}
                rows={rows}
                checkboxSelection
                keepNonExistentRowsSelected={true}
                disableRowSelectionOnClick
                isRowSelectable={(e) => e.row?.estado === 'STOCK'}
                onRowSelectionModelChange={handleItemsSelected}
                rowSelectionModel={stockItemsSelected.map(item => item.id)}
                columns={cols}
                slots={{
                    pagination: custom
                }}
            />
        </div>
    )
}

export default Table