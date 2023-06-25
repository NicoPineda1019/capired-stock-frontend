import { createSlice } from '@reduxjs/toolkit'

const mock = [
    {
      id: 90,
      codigo: "4022728",
      nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
      serial: "SERIAL234523463465",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 91,
      codigo: "4019461",
      nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
      serial: "SERIAL123562364",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 92,
      codigo: "4022728",
      nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
      serial: "SERIAL234523463465",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 93,
      codigo: "4019461",
      nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
      serial: "SERIAL123562364",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 94,
      codigo: "4022728",
      nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
      serial: "SERIAL234523463465",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 95,
      codigo: "4019461",
      nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
      serial: "SERIAL123562364",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 96,
      codigo: "4022728",
      nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
      serial: "SERIAL234523463465",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
    {
      id: 97,
      codigo: "4019461",
      nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
      serial: "SERIAL123562364",
      fecha_cargue: "2023-06-17T15:30:57.000Z",
      fecha_actualizacion: "2023-06-17T00:00:00.000Z",
      hora_actualizacion: "15:30:57",
      estado: "STOCK",
      usuario: null,
      confirmacion_cargue: "SI",
    },
  ];
export const inboxStockSlice = createSlice({
  name: 'INBOX_STOCK',
  initialState: {
    stockItemsIncoming: [...mock],
    categoryTab: "1"
  },
  reducers: {
    setStockItemsIncoming: (state, action) => {
      state.stockItemsIncoming = [...action.payload]
    },
    updateStockItemsIncoming: (state, action) => {
        state.stockItemsIncoming = state.stockItemsIncoming.map((item) => item.id === action.payload.id ? {...action.payload} : item)
    },
    setCategoryTab: (state, action) => {
        state.categoryTab = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStockItemsIncoming, updateStockItemsIncoming, setCategoryTab } = inboxStockSlice.actions

export default inboxStockSlice.reducer