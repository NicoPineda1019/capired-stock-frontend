import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'LOADING',
  initialState: {
    show: false,
  },
  reducers: {
    openLoading: (state) => {
      state.show = true
    },
    closeLoading: (state) => {
      state.show = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { openLoading, closeLoading } = loadingSlice.actions

export default loadingSlice.reducer