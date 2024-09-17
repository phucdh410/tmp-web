import { apiInstance } from "@axios/index";
import { IRegion, IRegionPayload, IRegionResponse } from "@interfaces/regions";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/region/types";

export const regionsApi = {
  getAll: async (store_code: string): Promise<IApiResponse<IRegion[], any>> => {
    return apiInstance.get("/regions/all", { params: { store_code } });
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
