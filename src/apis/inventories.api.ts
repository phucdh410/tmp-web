import { apiInstance } from "@axios/index";
import { IInventory } from "@interfaces/inventories";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/inventory/types";

export const inventoriesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IInventory>, any>> => {
    return apiInstance.get("/inventories", { params });
  },
  remove: async (id: string | number) => {
    return apiInstance.delete(`/inventories/${id}`);
  },
};