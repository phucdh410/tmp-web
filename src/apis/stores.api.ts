import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import { IStoreResponse } from "@interfaces/store";

export const storesApi = {
  getAll: async (): Promise<IApiResponse<IStoreResponse[], any>> => {
    return apiInstance.get("/stores/all");
  },
};
