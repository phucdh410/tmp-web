import { apiInstance } from "@axios/index";
import { IRegion } from "@interfaces/regions";
import { IApiResponse } from "@interfaces/response";

export const regionsApi = {
  getAll: async (store_code: string): Promise<IApiResponse<IRegion[], any>> => {
    return apiInstance.get("/regions/all", { params: { store_code } });
  },
};
