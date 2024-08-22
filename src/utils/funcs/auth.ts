import { authApi } from "@apis/auth.api";
import { apiInstance } from "@axios/index";
import { store } from "@redux/index";
import { updateAuthState, updateToken } from "@redux/slices";

export const setAuthToken = (access_token?: string) => {
  if (access_token) {
    apiInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
  } else {
    delete apiInstance.defaults.headers.common["Authorization"];
  }
};

export const logoutUser = async () => {
  try {
    await authApi.logout();
  } catch (error) {
    console.error(error);
  } finally {
    setAuthToken();
    store.dispatch(updateAuthState(null));
    store.dispatch(updateToken(null));
  }
};
