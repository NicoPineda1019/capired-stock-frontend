import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

const columns = [
    { field: 'fecha_cargue', headerName: 'Fecha de Cargue', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'codigo', headerName: 'Código', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'nombre_equipo', headerName: 'Nombre Equipo', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'serial', headerName: 'Serial', width: 220, headerClassName: '_table-header', cellClassName: '_table-cell' },
    {
        field: 'estado',
        headerName: 'Estado',
        width: 120,
        headerClassName: '_table-header',
        cellClassName: '_table-cell'
    },
    {
        field: 'usuario',
        headerName: 'Usuario',
        width: 160,
        headerClassName: '_table-header',
        cellClassName: '_table-cell'
    },
    {
        field: 'fecha_actualizacion',
        headerName: 'Fecha Actualizacion',
        width: 180,
        headerClassName: '_table-header',
        cellClassName: '_table-cell',
        valueGetter: (params) =>
            `${params.row.fecha_actualizacion || ''} ${params.row.hora_actualizacion || ''}`,
    },
];

const rows = [
    { id: 1, codigo: '146891961561', fecha_cargue: '2022-05-05 12:00:00', serial: '4ASDGA465161WE', nombre_equipo:'DECODIFICADOR', estado: 'PENDIENTE', usuario: 'NICOLAS PINEDA LOPEZ', fecha_actualizacion: '2022-05-02', hora_actualizacion: '14:45:00' },
    { id: 2, codigo: '146891961561', fecha_cargue: '2022-05-05 12:00:00', serial: '2ASDGA465161WE', nombre_equipo:'DECODIFICADOR', estado: 'PENDIENTE', usuario: 'NICOLAS PINEDA LOPEZ', fecha_actualizacion: '2022-05-02', hora_actualizacion: '14:45:00' },
    { id: 3, codigo: '146891961561', fecha_cargue: '2022-05-05 12:00:00', serial: '1ASDGA465161WE', nombre_equipo:'DECODIFICADOR', estado: 'PENDIENTE', usuario: 'NICOLAS PINEDA LOPEZ', fecha_actualizacion: '2022-05-02', hora_actualizacion: '14:45:00' },
];
const custom = (props) => {
 return <Pagination count={10} color="primary" />
}
const Table = () => {
    return (
        <div style={{ height: 400, width: '100%', backgroundColor: 'rgba(230, 235, 240, .7)' }}>
            <DataGrid
                
                rowSelection={false}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                slots={{
                    pagination: custom
                }}

            />
        </div>
    )
}

export default Table