import { apiInstance } from "@axios/index";
import { IPosition, IPositionPayload } from "@interfaces/positions";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/position/types";

export const positionsApi = {
  getPaginate: async (
    params?: IParams
  ): Promise<IApiResponse<IPaginateResponse<IPosition>, any>> => {
    return apiInstance.get("/places/positions", { params });
  },
  getById: async (id: string) => {
    return apiInstance.get(`/places/positions/${id}`);
  },
  create: async (body: IPositionPayload) => {
    return apiInstance.post("/places/positions", body);
  },
  update: async (id: string, body: IPositionPayload) => {
    return apiInstance.put(`/places/positions/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/places/positions/${id}`);
  },
  getAll: async (): Promise<IApiResponse<IPosition[], any>> => {
    return apiInstance.get("/places/positions/all");
  },
};
