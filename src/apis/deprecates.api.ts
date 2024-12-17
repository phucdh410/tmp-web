import { apiInstance } from "@axios/index";
import {
  IDeprecate,
  IDeprecatePaginationParams,
  IDeprecatePayload,
} from "@interfaces/deprecates";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const deprecatesApi = {
  getPaginate: async (
    params: IDeprecatePaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IDeprecate>, any>> => {
    return apiInstance.get("/deprecates", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/issues/${id}`);
  },
  create: async (body: IDeprecatePayload) => {
    return apiInstance.post("/issues", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IDeprecate, any>> => {
    return apiInstance.get(`/issues/${id}`);
  },
  update: async (id: number, body: IDeprecatePayload) => {
    return apiInstance.put(`/issues/${id}`, body);
  },
  exportExcel: async (params: IDeprecatePaginationParams) => {
    return apiInstance.get("/issues/export", {
      params,
      responseType: "blob",
    });
  },
};
