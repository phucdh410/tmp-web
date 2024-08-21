import { apiInstance } from "@axios/index";
import { ILoginPayload, ILoginResponse } from "@interfaces/auth";
import { IApiResponse } from "@interfaces/response";

export const authApi = {
  login: async (
    body: ILoginPayload
  ): Promise<IApiResponse<ILoginResponse, any>> => {
    return apiInstance.post("/auth/login", body);
  },
};
