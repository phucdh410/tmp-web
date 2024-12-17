import { apiInstance } from "@axios/index";
import {
  IRecovery,
  IRecoveryDetail,
  IRecoveryPaginationParams,
  IRecoveryPayload,
} from "@interfaces/recoveries";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const recoveriesApi = {
  getPaginate: async (
    params: IRecoveryPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IRecovery>, any>> => {
    return apiInstance.get("/recoveries", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/recoveries/${id}`);
  },
  create: async (body: IRecoveryPayload) => {
    return apiInstance.post("/recoveries", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IRecoveryDetail, any>> => {
    return apiInstance.get(`/recoveries/${id}`);
  },
  update: async (id: number, body: IRecoveryPayload) => {
    return apiInstance.put(`/recoveries/${id}`, body);
  },
  exportExcel: async (params: IRecoveryPaginationParams) => {
    return apiInstance.get("/recoveries/export", {
      params,
      responseType: "blob",
    });
  },
};
