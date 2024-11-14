import { apiInstance } from "@axios/index";
import {
  ILiquidate,
  ILiquidateDetail,
  ILiquidatePayload,
} from "@interfaces/liquidates";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/liquidate/types";

export const liquidatesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<ILiquidate>, any>> => {
    return apiInstance.get("/liquidates", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/liquidates/${id}`);
  },
  create: async (body: ILiquidatePayload) => {
    return apiInstance.post("/liquidates", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<ILiquidateDetail, any>> => {
    return apiInstance.get(`/liquidates/${id}`);
  },
  update: async (id: number, body: ILiquidatePayload) => {
    return apiInstance.put(`/liquidates/${id}`, body);
  },
  exportExcel: async (params: IParams) => {
    return apiInstance.get("/liquidates/export", {
      params,
      responseType: "blob",
    });
  },
};
