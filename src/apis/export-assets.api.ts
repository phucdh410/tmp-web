import { apiInstance } from "@axios/index";
import {
  IExportAsset,
  IExportAssetDetail,
  IExportAssetPaginationParams,
  IExportAssetPayload,
} from "@interfaces/export-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const exportAssetsApi = {
  getPaginate: async (
    params: IExportAssetPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IExportAsset>, any>> => {
    return apiInstance.get("/warehouse-exports", { params });
  },
  remove: async (id: string | number) => {
    return apiInstance.delete(`/warehouse-exports/${id}`);
  },
  create: async (body: IExportAssetPayload) => {
    return apiInstance.post("/warehouse-exports", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IExportAssetDetail, any>> => {
    return apiInstance.get(`/warehouse-exports/${id}`);
  },
  update: async (id: string | number, body: IExportAssetPayload) => {
    return apiInstance.put(`/warehouse-exports/${id}`, body);
  },
};
