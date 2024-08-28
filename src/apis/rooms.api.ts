import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IRoom, IRoomPayload } from "@interfaces/rooms";
import { IParams } from "@modules/room/types";

export const roomsApi = {
  getPaginate: async (
    params?: IParams
  ): Promise<IApiResponse<IPaginateResponse<IRoom>, any>> => {
    return apiInstance.get("/rooms", { params });
  },
  getById: async (id: string) => {
    return apiInstance.get(`/rooms/${id}`);
  },
  create: async (body: IRoomPayload) => {
    return apiInstance.post("/rooms", body);
  },
  update: async (id: string, body: IRoomPayload) => {
    return apiInstance.put(`/rooms/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/rooms/${id}`);
  },
};
