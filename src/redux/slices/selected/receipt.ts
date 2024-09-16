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
    setAllReceipts: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAll = action.payload;
      state.selected = [];
    },
    setSelectedReceipts: (state, action: PayloadAction<any[]>) => {
      state.selected = action.payload;
    },
  },
});

export const { setAllReceipts, setSelectedReceipts } =
  selectedReceiptSlice.actions;

export const selectedReceiptReducer = selectedReceiptSlice.reducer;
