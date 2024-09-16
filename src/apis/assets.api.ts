import { apiInstance } from "@axios/index";
import { IAsset, IAssetCode, IAssetCodeParams } from "@interfaces/assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/asset/types";

export const assetsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IAsset>, any>> => {
    return apiInstance.get("/assets", { params });
  },
  getCodes: async (
    params?: IAssetCodeParams
  ): Promise<IApiResponse<IAssetCode[], any>> => {
    return apiInstance.get("/assets/codes", { params });
  },
};
