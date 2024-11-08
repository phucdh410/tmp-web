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
    return apiInstance.get("/export-assets", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/export-assets/${id}`);
  },
  create: async (body: IExportAssetPayload) => {
    return apiInstance.post("/export-assets", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IExportAssetDetail, any>> => {
    return apiInstance.get(`/export-assets/${id}`);
  },
  update: async (id: number, body: IExportAssetPayload) => {
    return apiInstance.put(`/export-assets/${id}`, body);
  },
};
