import { createSlice } from '@reduxjs/toolkit'

export const tableStockSlice = createSlice({
  name: 'TABLE_STOCK',
  initialState: {
    serializableInfo: [],
    noSerializableInfo: [],
    numberPage: 1,
    currentPage: 1, 
    cols: [],
    categoryTab: '1',
    statusTab: '1',
    loading: false
  },
  reducers: {
    setSerializableInfo: (state, action) => {
      state.serializableInfo = [...action.payload]
    },
    setNoSerializableInfo: (state, action) => {
      state.noSerializableInfo = [...action.payload]
    },
    setCategoryTab: (state, action) => {
        state.categoryTab = action.payload
    },
    setStatusTab: (state, action) => {
        state.statusTab = action.payload
    },
    setColsTable: (state, action) => {
        state.cols = action.payload
    },
    setNumberPage: (state, action) => {
        state.numberPage = action.payload
    },
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSerializableInfo, setCategoryTab, setStatusTab, setColsTable, setNumberPage, setCurrentPage, setLoading, setNoSerializableInfo} = tableStockSlice.actions

export default tableStockSlice.reducer