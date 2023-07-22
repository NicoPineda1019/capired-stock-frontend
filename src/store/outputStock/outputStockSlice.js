import { createSlice } from '@reduxjs/toolkit'

export const outputStockSlice = createSlice({
  name: 'OUTPUT_STOCK',
  initialState: {
    works: [],
    work: {
        label: ''
    },
    accountNumber: '',
    workOrder: '',
    node: ''
  },
  reducers: {
    setWorks: (state, action) => {
      state.works = [...action.payload]
    },
    setWork: (state, action) => {
        state.work = {...action.payload}
    },
    updateAccountNumber: (state, action) => {
        state.accountNumber = action.payload
    },
    updateNode: (state, action) => {
        state.node = action.payload
    },
    updateWorkOrder: (state, action) => {
        state.workOrder = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWorks, setWork, updateAccountNumber,updateNode,updateWorkOrder} = outputStockSlice.actions

export default outputStockSlice.reducer