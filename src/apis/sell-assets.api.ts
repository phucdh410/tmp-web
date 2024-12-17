import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  ISellAsset,
  ISellAssetDetail,
  ISellAssetPaginationParams,
  ISellAssetPayload,
} from "@interfaces/sell-assets";

export const sellAssetsApi = {
  getPaginate: async (
    params: ISellAssetPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<ISellAsset>, any>> => {
    return apiInstance.get("/sell-assets", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/sell-assets/${id}`);
  },
  create: async (body: ISellAssetPayload) => {
    return apiInstance.post("/sell-assets", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<ISellAssetDetail, any>> => {
    return apiInstance.get(`/sell-assets/${id}`);
  },
  update: async (id: number, body: ISellAssetPayload) => {
    return apiInstance.put(`/sell-assets/${id}`, body);
  },
};
