import { createSlice } from '@reduxjs/toolkit'
import { getRangeMonth } from '../../utils/map'

const initDates = getRangeMonth();

export const summarytockSlice = createSlice({
  name: 'SUMMARY_STOCK',
  initialState: {
    startDate: initDates[0],
    endDate: initDates[1],
    itemsStock: []

  },
  reducers: {
    updateStartDate: (state, action) => {
      state.startDate = action.payload
    },
    updateEndDate: (state, action) => {
        state.endDate = action.payload
    },
    setItemsStock: (state, action) => {
        state.itemsStock = [...action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateStartDate, updateEndDate, setItemsStock } = summarytockSlice.actions

export default summarytockSlice.reducer