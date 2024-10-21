import { apiInstance } from "@axios/index";
import {
  ILiquidate,
  ILiquidateDetail,
  ILiquidatePayload,
} from "@interfaces/liquidates";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/transfer/types";

export const liquidatesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<ILiquidate>, any>> => {
    return apiInstance.get("/liquidates", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/liquidates/${id}`);
  },
  create: async (body: ILiquidatePayload) => {
    return apiInstance.post("/liquidates", body);
  },
  getById: async (id: string): Promise<IApiResponse<ILiquidateDetail, any>> => {
    return apiInstance.get(`/liquidates/${id}`);
  },
  update: async (id: string, body: ILiquidatePayload) => {
    return apiInstance.put(`/liquidates/${id}`, body);
  },
  exportExcel: async (params: IParams) => {
    return apiInstance.get("/liquidates/export", {
      params,
      responseType: "blob",
    });
  },
};
