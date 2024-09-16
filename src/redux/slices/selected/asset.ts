import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISelectedAssetState {
  isSelectedAll: boolean;
  selected: any[];
}

const initialState: ISelectedAssetState = {
  isSelectedAll: false,
  selected: [],
};

export const selectedAssetSlice = createSlice({
  name: "selectedAsset",
  initialState,
  reducers: {
    setAllAssets: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAll = action.payload;
      state.selected = [];
    },
    setSelectedAssets: (state, action: PayloadAction<any[]>) => {
      state.selected = action.payload;
    },
  },
});

export const { setAllAssets, setSelectedAssets } = selectedAssetSlice.actions;

export const selectedAssetReducer = selectedAssetSlice.reducer;
