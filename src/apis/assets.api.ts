import { apiInstance } from "@axios/index";
import { ASSET_VALUATION_TYPES } from "@constants/enums";
import {
  IAsset,
  IAssetCode,
  IAssetCodeParams,
  IAssetDetail,
  IAssetFromWarehouse,
  IAssetInAll,
  IAssetPaginationParams,
} from "@interfaces/assets";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const assetsApi = {
  getPaginate: async (
    params: IAssetPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IAsset>, any>> => {
    return apiInstance.get("/assets", { params });
  },
  getCodes: async (
    params?: IAssetCodeParams
  ): Promise<IApiResponse<IAssetCode[], any>> => {
    return apiInstance.get("/assets/codes", { params });
  },
  getAll: async (params?: {
    store_code?: string;
    category_id?: number;
    depreciation?: ASSET_VALUATION_TYPES;
  }): Promise<IApiResponse<IAssetInAll[], any>> => {
    return apiInstance.get("/assets/v1/all", { params });
  },
  getByCode: async (code: string): Promise<IApiResponse<IAssetDetail, any>> => {
    return apiInstance.get(`/assets/${code}`);
  },
  getByWarehouseId: async (
    id: number | string
  ): Promise<IApiResponse<IAssetFromWarehouse[], any>> => {
    return apiInstance.get(`/assets/warehouse/${id}`);
  },
};
