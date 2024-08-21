import { IProfile } from "@interfaces/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isLogined: boolean;
  profile: IProfile | null;
}

const initialState: IAuthState = {
  isLogined: false,
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<IProfile | null>) => {
      state.profile = action.payload;
      state.isLogined = !!action.payload;
    },
  },
});

export const { updateAuthState } = authSlice.actions;

export const authReducer = authSlice.reducer;
