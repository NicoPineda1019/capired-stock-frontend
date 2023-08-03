import { createSlice } from '@reduxjs/toolkit'

export const inboxStockSlice = createSlice({
  name: 'INBOX_STOCK',
  initialState: {
    stockItemsIncoming: [],
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