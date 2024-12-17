import { apiInstance } from "@axios/index";
import {
  IAcceptance,
  IAcceptanceDetail,
  IAcceptancePaginationParams,
  IAcceptancePayload,
} from "@interfaces/acceptances";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const acceptancesApi = {
  getPaginate: async (
    params: IAcceptancePaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IAcceptance>, any>> => {
    return apiInstance.get("/acceptances", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/acceptances/${id}`);
  },
  create: async (body: IAcceptancePayload) => {
    return apiInstance.post("/acceptances", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IAcceptanceDetail, any>> => {
    return apiInstance.get(`/acceptances/${id}`);
  },
  update: async (id: number, body: IAcceptancePayload) => {
    return apiInstance.put(`/acceptances/${id}`, body);
  },
  getAll: async (): Promise<IApiResponse<IAcceptance[], any>> => {
    return apiInstance.get("/acceptances/all");
  },
};
