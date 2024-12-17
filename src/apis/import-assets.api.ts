import { apiInstance } from "@axios/index";
import {
  IImportAsset,
  IImportAssetDetail,
  IImportAssetPaginationParams,
  IImportAssetPayload,
} from "@interfaces/import-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const importAssetsApi = {
  getPaginate: async (
    params: IImportAssetPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IImportAsset>, any>> => {
    return apiInstance.get("/warehouse-imports", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/warehouse-imports/${id}`);
  },
  create: async (body: IImportAssetPayload) => {
    return apiInstance.post("/warehouse-imports", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IImportAssetDetail, any>> => {
    return apiInstance.get(`/warehouse-imports/${id}`);
  },
  update: async (id: number, body: IImportAssetPayload) => {
    return apiInstance.put(`/warehouse-imports/${id}`, body);
  },
  insert: async (id: number | string) => {
    return apiInstance.put(`/warehouse-imports/approval/${id}`);
  },
};
