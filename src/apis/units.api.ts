import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import { ICreatedUnitResponse, IUnit, IUnitPayload } from "@interfaces/units";

export const unitsApi = {
  getAll: async (): Promise<IApiResponse<IUnit[], any>> => {
    return apiInstance.get("/units");
  },
  create: async (
    body: IUnitPayload
  ): Promise<IApiResponse<ICreatedUnitResponse, any>> => {
    return apiInstance.post("/units", body);
  },
};
