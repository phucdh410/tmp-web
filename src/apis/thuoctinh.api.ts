import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";

export const thuoctinhApi = {
  getAll: async (): Promise<IApiResponse<any[], any>> => {
    return apiInstance.get("/thuoctinh/all");
  },
};
