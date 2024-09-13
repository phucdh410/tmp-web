import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import {
  ICreatedVendorResponse,
  IVendor,
  IVendorPayload,
} from "@interfaces/vendors";

export const vendorsApi = {
  getAll: async (): Promise<IApiResponse<IVendor[], any>> => {
    return apiInstance.get("/vendors/all");
  },
  create: async (
    body: IVendorPayload
  ): Promise<IApiResponse<ICreatedVendorResponse, any>> => {
    return apiInstance.post("/vendors", body);
  },
  update: async (id: string, body: IVendorPayload) => {
    return apiInstance.post(`/vendors/${id}`, body);
  },
};
