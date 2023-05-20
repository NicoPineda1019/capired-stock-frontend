import { createSlice } from "@reduxjs/toolkit";

export const uploadStockSlice = createSlice({
  name: "UPLOAD_STOCK",
  initialState: {
    serializableStock: [],
    checkLoading: false,
    materials: []
  },
  reducers: {
    setItemSerializableStock: (state, action) => {
      state.serializableStock = [...action.payload];
    },
    addItemSerializableStock: (state, action) => {
      state.serializableStock = [...state.serializableStock, ...action.payload];
    },
    updateItemSerializableStock: (state, action) => {
      state.serializableStock = state.serializableStock.map((item, idx) =>
        action.payload.idArray === idx ? action.payload : item
      );
    },
    deleteItemSerializableStock: (state, action) => {
      state.serializableStock = state.serializableStock.filter((item, idx) =>
        action.payload !== idx
      );
    },
    setCheckLoading: (state, action) => {
      state.checkLoading = action.payload
    },
    setMaterial: (state, action) => {
      state.materials = [...action.payload]
    }
  },
});

// Action creators are generated for each case reducer function
export const { addItemSerializableStock, updateItemSerializableStock, deleteItemSerializableStock, setItemSerializableStock, setCheckLoading, setMaterial } =
  uploadStockSlice.actions;

export default uploadStockSlice.reducer;
