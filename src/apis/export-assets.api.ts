import { apiInstance } from "@axios/index";
import {
  IExportAsset,
  IExportAssetDetail,
  IExportAssetPayload,
} from "@interfaces/export-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/export-asset/types";

export const exportAssetsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IExportAsset>, any>> => {
    return apiInstance.get("/warehouse-exports", { params });
  },
  remove: async (id: number) => {
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
  update: async (id: number, body: IExportAssetPayload) => {
    return apiInstance.put(`/warehouse-exports/${id}`, body);
  },
};
