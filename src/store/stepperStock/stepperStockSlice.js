import { createSlice } from '@reduxjs/toolkit'

export const stepperStockSlice = createSlice({
  name: 'STEPPER_STOCK',
  initialState: {
    activeStep: 0,
  },
  reducers: {
    setStep: (state, action) => {
      state.activeStep = action.payload
    },
    nextStep: (state) => {
        state.activeStep = state.activeStep + 1
    },
    previousStep: (state) => {
        state.activeStep = state.activeStep - 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStep, nextStep, previousStep} = stepperStockSlice.actions

export default stepperStockSlice.reducer