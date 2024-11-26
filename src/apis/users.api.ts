import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import { IUser } from "@interfaces/users";

export const usersApi = {
  getAll: async (params?: {
    store_code: string;
  }): Promise<IApiResponse<IUser[], any>> => {
    return apiInstance.get("/users", { params });
  },
};
