import { apiInstance } from "@axios/index";
import {
  ICreatedPropertyResponse,
  IProperty,
  IPropertyPayload,
} from "@interfaces/properties";
import { IApiResponse } from "@interfaces/response";

export const propertiesApi = {
  getAll: async (): Promise<IApiResponse<IProperty[], any>> => {
    return apiInstance.get("/properties/all");
  },
  create: async (
    body: IPropertyPayload
  ): Promise<IApiResponse<ICreatedPropertyResponse, any>> => {
    return apiInstance.post("/properties", body);
  },
};
