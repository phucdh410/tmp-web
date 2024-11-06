import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
import {
  IAsset,
  IAssetCode,
  IAssetCodeParams,
  IAssetDetail,
  IAssetInAll,
} from "@interfaces/assets";
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
  getAll: async (): Promise<IApiResponse<IAssetInAll[], any>> => {
    return apiInstance
      .get("/assets/v1/all")
      .then((response) => modifyResponseStringToNumber(response, ["id"]));
  },
  getById: async (
    id: string | number
  ): Promise<IApiResponse<IAssetDetail, any>> => {
    return apiInstance.get(`/assets/getById/${id}`);
  },
};
