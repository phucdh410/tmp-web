import { apiInstance } from "@axios/index";
import { IPlace, IPlacePayload } from "@interfaces/places";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/place/types";

export const roomGroupsApi = {
  getPaginate: async (
    params?: IParams
  ): Promise<IApiResponse<IPaginateResponse<IPlace>, any>> => {
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
  getAll: async (): Promise<IApiResponse<IPlace[], any>> => {
    return apiInstance.get("/places/all");
  },
};
