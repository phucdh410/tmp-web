import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  ICreatedVendorResponse,
  IVendorPayload,
  IVendorResponse,
} from "@interfaces/vendors";
import { IParams } from "@modules/vendor/types";

export const vendorsApi = {
  getAll: async (): Promise<IApiResponse<IVendorResponse[], any>> => {
    return apiInstance.get("/vendors/all");
  },
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IVendorResponse>, any>> => {
    return apiInstance.get("/vendors", { params });
  },
  create: async (
    body: IVendorPayload
  ): Promise<IApiResponse<ICreatedVendorResponse, any>> => {
    return apiInstance.post("/vendors", body);
  },
  update: async (id: string, body: IVendorPayload) => {
    return apiInstance.post(`/vendors/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/vendors/${id}`);
  },
};
