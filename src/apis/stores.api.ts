import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IStorePayload, IStoreResponse } from "@interfaces/stores";
import { IParams } from "@modules/store/types";

export const storesApi = {
  getAll: async (): Promise<IApiResponse<IStoreResponse[], any>> => {
    return apiInstance.get("/stores/all");
  },
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IStoreResponse>, any>> => {
    return apiInstance.get("/stores", { params });
  },
  create: async (body: IStorePayload) => {
    return apiInstance.post("/stores", body);
  },
  update: async (id: string, body: IStorePayload) => {
    return apiInstance.put(`/stores/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/stores/${id}`);
  },
};
