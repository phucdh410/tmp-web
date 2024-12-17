import { apiInstance } from "@axios/index";
import {
  IRegionPaginationParams,
  IRegionPayload,
  IRegionResponse,
} from "@interfaces/regions";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const regionsApi = {
  getAll: async (params?: {
    store_code: string;
  }): Promise<IApiResponse<IRegionResponse[], any>> => {
    return apiInstance.get("/regions/all", { params });
  },
  getPaginate: async (
    params: IRegionPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IRegionResponse>, any>> => {
    return apiInstance.get("/regions", { params });
  },
  create: async (body: IRegionPayload) => {
    return apiInstance.post("/regions", body);
  },
  update: async (id: number, body: IRegionPayload) => {
    return apiInstance.put(`/regions/${id}`, body);
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/regions/${id}`);
  },
};
