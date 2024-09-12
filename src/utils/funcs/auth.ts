import { authApi } from "@apis/auth.api";
import { apiInstance } from "@axios/index";
import { store } from "@redux/index";
import { updateAuthState, updateToken } from "@redux/slices";
import { AxiosResponse } from "axios";

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

let isRefreshing = false;
const waitToRefreshRequests: any[] = [];

export const handleRefresh = async (response: AxiosResponse<any, any>) => {
  const originalRequest = response.config;
  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const rootState = store.getState();
      const refreshToken = rootState?.auth?.refresh_token;
      if (refreshToken) {
        const res = await authApi.refresh({ refresh_token: refreshToken });
        isRefreshing = false;

        const { access_token, refresh_token } = res.data.data;

        store.dispatch(updateToken({ access_token, refresh_token }));
        setAuthToken(access_token);

        waitToRefreshRequests.forEach(({ resolve }) => {
          resolve(access_token);
        });

        return apiInstance({
          ...originalRequest,
          headers: { Authorization: `Bearer ${access_token}` },
        });
      }
    } catch {
      isRefreshing = false;
      logoutUser();
    }
  } else {
    return new Promise((resolve, reject) =>
      waitToRefreshRequests.push({
        resolve: (newToken: string) => {
          const headers = {
            ...response.headers,
            Authorization: `Bearer ${newToken}`,
          };
          resolve(apiInstance({ ...response.config, headers }));
        },
        reject,
      })
    );
  }
};
