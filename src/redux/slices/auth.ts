import { IProfile } from "@interfaces/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isLogined: boolean;
  access_token: string;
  refresh_token: string;
  profile: IProfile | null;
}

const initialState: IAuthState = {
  isLogined: false,
  access_token: "",
  refresh_token: "",
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
    updateToken: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
      } | null>
    ) => {
      state.access_token = action.payload?.access_token ?? "";
      state.refresh_token = action.payload?.refresh_token ?? "";
    },
  },
});

export const { updateAuthState, updateToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
