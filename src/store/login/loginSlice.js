import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'LOGIN',
  initialState: {
    user: '',
    pass: '',
    error: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setPass: (state, action) => {
      state.pass = action.payload
    },
    setError:(state, action) => {
        state.error = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setPass, setError } = loginSlice.actions

export default loginSlice.reducer