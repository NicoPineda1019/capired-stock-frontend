import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  works: [],
  work:{},
  accountNumber: "",
  workOrder: "",
  node: "",
  itemsStock: [],
  refresh: true
};
export const outputStockSlice = createSlice({
  name: "OUTPUT_STOCK",
  initialState,
  reducers: {
    setWorks: (state, action) => {
      state.works = [...action.payload];
    },
    setWork: (state, action) => {
      state.work = { ...action.payload };
    },
    updateAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
    updateNode: (state, action) => {
      state.node = action.payload;
    },
    updateWorkOrder: (state, action) => {
      state.workOrder = action.payload;
    },
    setItemsStock: (state, action) => {
      state.itemsStock = [...action.payload];
    },
    updateItemsStock: (state, action) => {
      state.itemsStock = state.itemsStock.map((item) =>
        item.id === action.payload.id ? { ...action.payload } : item
      );
    },
    setRefresh:(state, action) => {
      state.refresh = action.payload
    },
    resetItemsStock: (state) => {
      state.work = initialState.work;
      state.accountNumber = initialState.accountNumber;
      state.workOrder = initialState.workOrder;
      state.node = initialState.node;
      state.itemsStock = initialState.itemsStock;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWorks,
  setWork,
  updateAccountNumber,
  updateNode,
  updateWorkOrder,
  setItemsStock,
  updateItemsStock,
  resetItemsStock,
  setRefresh
} = outputStockSlice.actions;

export default outputStockSlice.reducer;
