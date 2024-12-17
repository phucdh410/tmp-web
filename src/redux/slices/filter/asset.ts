import { IAssetPaginationParams } from "@interfaces/assets";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterAssetState {
  filter: IAssetPaginationParams;
}

const initialState: IFilterAssetState = {
  filter: { page: 1, limit: 10 },
};

export const filterAssetSlice = createSlice({
  name: "filterAsset",
  initialState,
  reducers: {
    saveAssetFilter: (state, action: PayloadAction<IAssetPaginationParams>) => {
      state.filter = action.payload;
    },
  },
});

export const { saveAssetFilter } = filterAssetSlice.actions;

export const filterAssetReducer = filterAssetSlice.reducer;
