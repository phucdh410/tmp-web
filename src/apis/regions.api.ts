import { apiInstance } from "@axios/index";
import { IRegionPayload, IRegionResponse } from "@interfaces/regions";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/region/types";

export const regionsApi = {
  getAll: async (params?: {
    store_code: string;
  }): Promise<IApiResponse<IRegionResponse[], any>> => {
    return apiInstance.get("/regions/all", { params });
  },
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IRegionResponse>, any>> => {
    return apiInstance.get("/regions", { params });
  },
  create: async (body: IRegionPayload) => {
    return apiInstance.post("/regions", body);
  },
  update: async (id: string, body: IRegionPayload) => {
    return apiInstance.put(`/regions/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/regions/${id}`);
  },
};
