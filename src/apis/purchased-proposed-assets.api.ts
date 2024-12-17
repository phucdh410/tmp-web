import { apiInstance } from "@axios/index";
import {
  IPurchasedProposedAsset,
  IPurchasedProposedAssetPaginationParams,
  IUpdatedStatusPayload,
} from "@interfaces/purchased-proposed-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const purchasedProposedAssetsApi = {
  getPaginate: async (
    params: IPurchasedProposedAssetPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IPurchasedProposedAsset>, any>> => {
    return apiInstance.get("/asset-proposals/assets", { params });
  },
  updateStatus: async (id: number | string, body: IUpdatedStatusPayload) => {
    return apiInstance.put(`/asset-proposals/assets/${id}`, {
      ...body,
      note: "updated",
    });
  },
  export: async (params: IPurchasedProposedAssetPaginationParams) => {
    return apiInstance.get("/asset-proposals/assets/export", {
      params,
      responseType: "blob",
    });
  },
};
