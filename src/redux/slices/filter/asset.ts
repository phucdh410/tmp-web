import { IParams } from "@modules/asset/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterAssetState {
  filter: IParams;
}

const initialState: IFilterAssetState = {
  filter: { page: 1, limit: 10 },
};

export const filterAssetSlice = createSlice({
  name: "filterAsset",
  initialState,
  reducers: {
    saveAssetFilter: (state, action: PayloadAction<IParams>) => {
      state.filter = action.payload;
    },
  },
});

export const { saveAssetFilter } = filterAssetSlice.actions;

export const filterAssetReducer = filterAssetSlice.reducer;
