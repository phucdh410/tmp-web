import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";

export const loaiccdcApi = {
  getAll: async (): Promise<IApiResponse<any[], any>> => {
    return apiInstance.get("/loaiccdc/all");
  },
};
