import { createSlice } from "@reduxjs/toolkit";

export const uploadStockSlice = createSlice({
  name: "UPLOAD_STOCK",
  initialState: {
    scannerValue: "",
    serializableStock: [],
    noSerializableStock: [],
    checkLoading: false,
    materials: [],
    category: "1",
  },
  reducers: {
    setScannerValue: (state, action) => {
      state.scannerValue = state.scannerValue + action.payload;
    },
    resetScannerValue: (state, action) => {
      state.scannerValue = "";
    },
    setItemSerializableStock: (state, action) => {
      state.serializableStock = [...action.payload];
    },
    setItemNoSerializableStock: (state, action) => {
      state.noSerializableStock = [...action.payload];
    },
    addItemSerializableStock: (state, action) => {
      state.serializableStock = [...state.serializableStock, { serial: state.scannerValue} ];
    },
    addItemNoSerializableStock: (state, action) => {
      state.serializableStock = [...state.serializableStock, ...action.payload];
    },
    updateItemSerializableStock: (state, action) => {
      state.serializableStock = state.serializableStock.map((item, idx) =>
        action.payload.idArray === idx ? action.payload : item
      );
    },
    deleteItemSerializableStock: (state, action) => {
      state.serializableStock = state.serializableStock.filter(
        (item, idx) => action.payload !== idx
      );
    },
    deleteItemNoSerializableStock: (state, action) => {
      state.noSerializableStock = state.noSerializableStock.filter(
        (item, idx) => action.payload !== idx
      );
    },
    setCheckLoading: (state, action) => {
      state.checkLoading = action.payload;
    },
    setMaterial: (state, action) => {
      state.materials = {...action.payload};
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addItemSerializableStock,
  updateItemSerializableStock,
  deleteItemSerializableStock,
  setItemSerializableStock,
  setCheckLoading,
  setMaterial,
  setCategory,
  setItemNoSerializableStock,
  addItemNoSerializableStock,
  deleteItemNoSerializableStock,
  setScannerValue,
  resetScannerValue
} = uploadStockSlice.actions;

export default uploadStockSlice.reducer;
