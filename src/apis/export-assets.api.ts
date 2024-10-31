import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
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
  remove: async (id: string) => {
    return apiInstance.delete(`/export-assets/${id}`);
  },
  create: async (body: IExportAssetPayload) => {
    return apiInstance.post("/export-assets", body);
  },
  getById: async (
    id: string
  ): Promise<IApiResponse<IExportAssetDetail, any>> => {
    return apiInstance
      .get(`/export-assets/${id}`)
      .then((response) =>
        modifyResponseStringToNumber(response, ["id", "store_id", "vendor_id"])
      );
  },
  update: async (id: string, body: IExportAssetPayload) => {
    return apiInstance.put(`/export-assets/${id}`, body);
  },
};
