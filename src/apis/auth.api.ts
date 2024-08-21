import { apiInstance } from "@axios/index";
import { ILoginPayload, ILoginResponse, IProfile } from "@interfaces/auth";
import { IApiResponse } from "@interfaces/response";

export const authApi = {
  login: async (
    body: ILoginPayload
  ): Promise<IApiResponse<ILoginResponse, any>> => {
    return apiInstance.post("/auth/login", body);
  },
  getProfile: async (): Promise<IApiResponse<IProfile, any>> => {
    return apiInstance.get("/auth/get-profile");
  },
  logout: async () => {
    return apiInstance.post("/auth/logout");
  },
};
