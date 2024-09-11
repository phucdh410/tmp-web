import { IParams } from "@modules/receipt/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterReceiptState {
  filter: IParams;
}

const initialState: IFilterReceiptState = {
  filter: { page: 1, limit: 10 },
};

export const filterReceiptSlice = createSlice({
  name: "filterReceipt",
  initialState,
  reducers: {
    saveReceiptFilter: (state, action: PayloadAction<IParams>) => {
      state.filter = action.payload;
    },
  },
});

export const { saveReceiptFilter } = filterReceiptSlice.actions;

export const filterReceiptReducer = filterReceiptSlice.reducer;
