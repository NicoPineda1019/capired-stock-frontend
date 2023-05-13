import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../store/tableStock/tableStockSlice';

const Table = ({cols, rows, numberPage, currentPage, loading}) => {
    const dispatch = useDispatch();

    const handleChange = (e, value) => {
        dispatch(setCurrentPage(value))
    }
    const custom = () => {
     return <Pagination count={numberPage} page={currentPage} color="primary" onChange={handleChange} />
    }
    return (
        <div style={{ height: '80vh', backgroundColor: 'rgba(230, 235, 240, .7)' }}>
            <DataGrid
                loading={loading}
                rowSelection={false}
                rows={rows}
                columns={cols}
                slots={{
                    pagination: custom
                }}

            />

        </div>
    )
}

export default Table