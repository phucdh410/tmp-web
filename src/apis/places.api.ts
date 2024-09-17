import { apiInstance } from "@axios/index";
import { IPlacePayload, IPlaceResponse } from "@interfaces/places";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/place/types";

export const placesApi = {
  getPaginate: async (
    params?: IParams
  ): Promise<IApiResponse<IPaginateResponse<IPlaceResponse>, any>> => {
    return apiInstance.get("/places", { params });
  },
  getById: async (id: string) => {
    return apiInstance.get(`/places/${id}`);
  },
  create: async (body: IPlacePayload) => {
    return apiInstance.post("/places", body);
  },
  update: async (id: string, body: IPlacePayload) => {
    return apiInstance.put(`/places/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/places/${id}`);
  },
  getAll: async (): Promise<IApiResponse<IPlaceResponse[], any>> => {
    return apiInstance.get("/places/all");
  },
};
