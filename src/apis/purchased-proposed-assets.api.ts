import { apiInstance } from "@axios/index";
import {
  IPurchasedProposedAsset,
  IUpdatedStatusPayload,
} from "@interfaces/purchased-proposed-assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/purchased-proposed-asset/types";

export const purchasedProposedAssetsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IPurchasedProposedAsset>, any>> => {
    return apiInstance.get("/asset-proposals/assets", { params });
  },
  updateStatus: async (id: number | string, body: IUpdatedStatusPayload) => {
    return apiInstance.put(`/asset-proposals/assets/${id}`, {
      ...body,
      note: "updated",
    });
  },
  export: async (params: IParams) => {
    return apiInstance.get("/asset-proposals/assets/export", {
      params,
      responseType: "blob",
    });
  },
};
