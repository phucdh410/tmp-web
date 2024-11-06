import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
import {
  IImportAsset,
  IImportAssetDetail,
  IImportAssetPayload,
} from "@interfaces/import-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/import-asset/types";

export const importAssetsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IImportAsset>, any>> => {
    return apiInstance.get("/warehouse-imports", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/warehouse-imports/${id}`);
  },
  create: async (body: IImportAssetPayload) => {
    return apiInstance.post("/warehouse-imports", body);
  },
  getById: async (
    id: string
  ): Promise<IApiResponse<IImportAssetDetail, any>> => {
    return apiInstance
      .get(`/warehouse-imports/${id}`)
      .then((response) =>
        modifyResponseStringToNumber(response, ["id", "store_id", "vendor_id"])
      );
  },
  update: async (id: string, body: IImportAssetPayload) => {
    return apiInstance.put(`/warehouse-imports/${id}`, body);
  },
};
