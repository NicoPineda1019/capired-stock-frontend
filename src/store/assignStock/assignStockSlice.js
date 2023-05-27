import { createSlice } from '@reduxjs/toolkit'

export const assignStockSlice = createSlice({
  name: 'ASSIGN_STOCK',
  initialState: {
    stockItemsSelected: [],
    users: [],
    userAssign: {}

  },
  reducers: {
    updateItemsSelected: (state, action) => {
      state.stockItemsSelected = [...action.payload]
    },
    updateInfoItemsSelected: (state, action) => {
        state.stockItemsSelected = state.stockItemsSelected.map((item) => item.id === action.payload.id ? {...action.payload} : item)
    },
    setUsers: (state, action) => {
        state.users = [...action.payload]
    },
    setUserAssign: (state, action) => {
        state.userAssign = {...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateItemsSelected, updateInfoItemsSelected, setUsers, setUserAssign } = assignStockSlice.actions

export default assignStockSlice.reducer