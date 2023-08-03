import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'MODAL',
  initialState: {
    show: false,
    info: {}

  },
  reducers: {
    openModal: (state) => {
      state.show = true
    },
    closeModal: (state) => {
        state.show = false
        state.info = {}
    },
    setModalInfo: (state, action) => {
        state.info = { ...action.payload }
    }
  },
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal, setModalInfo } = modalSlice.actions

export default modalSlice.reducer