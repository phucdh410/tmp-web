import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISelectedTransferState {
  isSelectedAll: boolean;
  selected: any[];
}

const initialState: ISelectedTransferState = {
  isSelectedAll: false,
  selected: [],
};

export const selectedTransferSlice = createSlice({
  name: "selectedTransfer",
  initialState,
  reducers: {
    setAllTransfers: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAll = action.payload;
      state.selected = [];
    },
    setSelectedTransfers: (state, action: PayloadAction<any[]>) => {
      state.selected = action.payload;
    },
  },
});

export const { setAllTransfers, setSelectedTransfers } =
  selectedTransferSlice.actions;

export const selectedTransferReducer = selectedTransferSlice.reducer;
