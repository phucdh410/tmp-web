import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";

export const donvitinhApi = {
  getAll: async (): Promise<IApiResponse<any[], any>> => {
    return apiInstance.get("/donvitinh/all");
  },
};
