import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";

export const nhacungcapApi = {
  getAll: async (): Promise<IApiResponse<any[], any>> => {
    return apiInstance.get("/nhacungcap/all");
  },
};
