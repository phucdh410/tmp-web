import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import { IUnit } from "@interfaces/units";

export const unitsApi = {
  getAll: async (): Promise<IApiResponse<IUnit[], any>> => {
    return apiInstance.get("/units");
  },
};
