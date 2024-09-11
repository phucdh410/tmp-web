import { apiInstance } from "@axios/index";
import { IProperty } from "@interfaces/properties";
import { IApiResponse } from "@interfaces/response";

export const propertiesApi = {
  getAll: async (): Promise<IApiResponse<IProperty[], any>> => {
    return apiInstance.get("/properties/all");
  },
};
