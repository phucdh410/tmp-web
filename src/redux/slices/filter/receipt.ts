import { IReceiptPaginationParams } from "@interfaces/receipts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterReceiptState {
  filter: IReceiptPaginationParams;
}

const initialState: IFilterReceiptState = {
  filter: { page: 1, limit: 10 },
};

export const filterReceiptSlice = createSlice({
  name: "filterReceipt",
  initialState,
  reducers: {
    saveReceiptFilter: (
      state,
      action: PayloadAction<IReceiptPaginationParams>
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { saveReceiptFilter } = filterReceiptSlice.actions;

export const filterReceiptReducer = filterReceiptSlice.reducer;
