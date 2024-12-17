import { apiInstance } from "@axios/index";
import {
  IAssetInformation,
  IAssetValuation,
  IAssetValuationDetail,
  IAssetValuationPaginationParams,
  IAssetValuationPayload,
} from "@interfaces/asset-valuations";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const assetValuationsApi = {
  getPaginate: async (
    params: IAssetValuationPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IAssetValuation>, any>> => {
    return apiInstance.get("/asset-valuations", { params });
  },
  remove: async (id: number | string) => {
    return apiInstance.delete(`/asset-valuations/${id}`);
  },
  create: async (body: IAssetValuationPayload) => {
    return apiInstance.post("/asset-valuations", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IAssetValuationDetail, any>> => {
    return apiInstance.get(`/asset-valuations/${id}`);
  },
  update: async (id: number | string, body: IAssetValuationPayload) => {
    return apiInstance.put(`/asset-valuations/${id}`, body);
  },
  getAssetInformation: async (
    id: number | string,
    asset_id: number | string
  ): Promise<IApiResponse<IAssetInformation, any>> => {
    return apiInstance.get(`/asset-valuations/${id}information/${asset_id}`);
  },
  calculate: async (params: {
    asset_id: number;
    valuation_value: number;
  }): Promise<IApiResponse<IAssetInformation, any>> => {
    return apiInstance.get("/asset-valuations/calculate", { params });
  },
};
