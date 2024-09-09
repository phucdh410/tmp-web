import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISelectedReceiptState {
  isSelectedAll: boolean;
  selected: any[];
}

const initialState: ISelectedReceiptState = {
  isSelectedAll: false,
  selected: [],
};

export const selectedReceiptSlice = createSlice({
  name: "selectedReceipt",
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAll = action.payload;
      state.selected = [];
    },
    setSelected: (state, action: PayloadAction<any[]>) => {
      state.selected = action.payload;
    },
  },
});

export const { setAll, setSelected } = selectedReceiptSlice.actions;

export const selectedReceiptReducer = selectedReceiptSlice.reducer;
