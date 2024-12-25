import { apiInstance } from "@axios/index";
import {
  IAssetProposal,
  IAssetProposalDetail,
  IAssetProposalPaginationParams,
} from "@interfaces/asset-proposals";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const assetProposalsApi = {
  getPaginate: async (
    params: IAssetProposalPaginationParams
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
  getTotal: async (
    params: IAssetProposalPaginationParams
  ): Promise<IApiResponse<{ total: number }, any>> => {
    return apiInstance.get("/asset-proposals/total-price", { params });
  },
};
