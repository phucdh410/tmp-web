import { apiInstance } from "@axios/index";
import {
  IInventory,
  IInventoryDetail,
  IInventoryPayload,
} from "@interfaces/inventories";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/inventory/types";

export const inventoriesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IInventory>, any>> => {
    return apiInstance.get("/stocktakes", { params });
  },
  create: async (body: IInventoryPayload) => {
    return apiInstance.post("/stocktakes", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IInventoryDetail, any>> => {
    return apiInstance.get(`/stocktakes/${id}`);
  },
  update: async (id: string | number, body: IInventoryPayload) => {
    return apiInstance.put(`/stocktakes/${id}`, body);
  },
  remove: async (id: string | number) => {
    return apiInstance.delete(`/stocktakes/${id}`);
  },
};
