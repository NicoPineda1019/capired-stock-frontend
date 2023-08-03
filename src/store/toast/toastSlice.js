import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "TOAST",
  initialState: {
    show: false,
    message: "",
    type: "",
  },
  reducers: {
    setParameters: (state, action) => {
      state.show = action.payload.show
      state.message = action.payload.msg;
      state.type = action.payload.type;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
    setParameters
} = toastSlice.actions;

export default toastSlice.reducer;
