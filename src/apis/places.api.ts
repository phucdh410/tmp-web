import { apiInstance } from "@axios/index";
import {
  IPlacePaginationParams,
  IPlacePayload,
  IPlaceResponse,
} from "@interfaces/places";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const placesApi = {
  getPaginate: async (
    params?: IPlacePaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IPlaceResponse>, any>> => {
    return apiInstance.get("/places", { params });
  },
  getById: async (id: number | string) => {
    return apiInstance.get(`/places/${id}`);
  },
  create: async (body: IPlacePayload) => {
    return apiInstance.post("/places", body);
  },
  update: async (id: number, body: IPlacePayload) => {
    return apiInstance.put(`/places/${id}`, body);
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/places/${id}`);
  },
  getAll: async (params?: {
    store_code: string;
  }): Promise<IApiResponse<IPlaceResponse[], any>> => {
    return apiInstance.get("/places/all", { params });
  },
};
