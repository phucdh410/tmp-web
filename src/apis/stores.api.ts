import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  IStorePaginationParams,
  IStorePayload,
  IStoreResponse,
} from "@interfaces/stores";

export const storesApi = {
  getAll: async (): Promise<IApiResponse<IStoreResponse[], any>> => {
    return apiInstance.get("/stores/all");
  },
  getPaginate: async (
    params: IStorePaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IStoreResponse>, any>> => {
    return apiInstance.get("/stores", { params });
  },
  create: async (body: IStorePayload) => {
    return apiInstance.post("/stores", body);
  },
  update: async (id: number, body: IStorePayload) => {
    return apiInstance.put(`/stores/${id}`, body);
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/stores/${id}`);
  },
};
