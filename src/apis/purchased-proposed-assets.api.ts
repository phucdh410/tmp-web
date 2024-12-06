import { apiInstance } from "@axios/index";
import {
  IPurchasedProposedAsset,
  IPurchasedProposedAssetDetail,
  IUpdatedStatusPayload,
} from "@interfaces/purchased-proposed-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/purchased-proposed-asset/types";

export const purchasedProposedAssetsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IPurchasedProposedAsset>, any>> => {
    return apiInstance.get("/purchased-proposed-assets", { params });
  },
  updateStatus: async (id: number | string, body: IUpdatedStatusPayload) => {
    return apiInstance.put(`/purchased-proposed-assets/${id}/status`, body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IPurchasedProposedAssetDetail, any>> => {
    return apiInstance.get(`/purchased-proposed-assets/${id}`);
  },
};
