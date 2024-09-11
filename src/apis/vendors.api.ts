import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import { IVendor } from "@interfaces/vendors";

export const vendorsApi = {
  getAll: async (): Promise<IApiResponse<IVendor[], any>> => {
    return apiInstance.get("/vendors/all");
  },
};
