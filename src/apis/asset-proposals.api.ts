import { apiInstance } from "@axios/index";
import {
  IAssetProposal,
  IAssetProposalDetail,
} from "@interfaces/asset-proposals";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/asset-proposal/types";

export const assetProposalsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IAssetProposal>, any>> => {
    return apiInstance.get("/asset-proposals", { params });
  },
  remove: async (id: number | string) => {
    return apiInstance.delete(`/asset-proposals/${id}`);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IAssetProposalDetail, any>> => {
    return apiInstance.get(`/asset-proposals/${id}`);
  },
};
