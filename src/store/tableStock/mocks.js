import { Chip, Stack } from "@mui/material";

export const serializableInfo = [
    { id: 1, codigo: '146891961561', fecha_cargue: '2022-05-05 12:00:00', serial: '4ASDGA465161WE', nombre:'DECODIFICADOR', estado: 'STOCK', fecha_actualizacion: '2022-05-02', hora_actualizacion: '14:45:00' },
    { id: 2, codigo: '146891961561', fecha_cargue: '2022-05-05 12:00:00', serial: '2ASDGA465161WE', nombre:'DECODIFICADOR', estado: 'PENDIENTE', fecha_actualizacion: '2022-05-02', usuario: 'NICOLAS PINEDA LOPEZ', hora_actualizacion: '14:45:00'},
  ];
export const noSerialStock = [
    { field: 'fecha_cargue', headerName: 'Fecha de Cargue', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'codigo', headerName: 'Código', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'nombre', headerName: 'Nombre', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    {
        field: 'cant',
        headerName: 'Cantidad',
        width: 160,
        headerClassName: '_table-header',
        cellClassName: '_table-cell'
    },
    {
        field: 'estado',
        headerName: 'Estado',
        width: 120,
        headerClassName: '_table-header',
        cellClassName: '_table-cell',
        renderCell: (params) => <Stack direction="row" spacing={1}>
        <Chip label={`${params.row.estado}`} color="success" />
      </Stack>
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

  export const serialStock = [
    { field: 'fecha_cargue', headerName: 'Fecha de Cargue', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'codigo', headerName: 'Código', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'nombre_equipo', headerName: 'Nombre Equipo', width: 180, headerClassName: '_table-header', cellClassName: '_table-cell' },
    { field: 'serial', headerName: 'Serial', width: 220, headerClassName: '_table-header', cellClassName: '_table-cell' },
    {
        field: 'estado',
        headerName: 'Estado',
        width: 120,
        headerClassName: '_table-header',
        cellClassName: '_table-cell',
        renderCell: (params) => <Stack direction="row" spacing={1}>
        <Chip label={`${params.row.estado}`} color="success" />
      </Stack>
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
        headerName: 'Fecha Actualización',
        width: 180,
        headerClassName: '_table-header',
        cellClassName: '_table-cell',
        valueGetter: (params) =>
            `${params.row.fecha_actualizacion || ''} ${params.row.hora_actualizacion || ''}`,
    }
  ]