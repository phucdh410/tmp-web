import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  IRateInRoom,
  IRoom,
  IRoomDetail,
  IRoomPayload,
  IUpdateAmenitiesInRoomPayload,
} from "@interfaces/rooms";
import { IParams } from "@modules/room/types";

export const roomsApi = {
  getPaginate: async (
    params?: IParams
  ): Promise<IApiResponse<IPaginateResponse<IRoom>, any>> => {
    return apiInstance.get("/rooms", { params });
  },
  getById: async (id: string): Promise<IApiResponse<IRoomDetail, any>> => {
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
  updateAmenitiesInRoom: async (body: IUpdateAmenitiesInRoomPayload) => {
    return apiInstance.post("/rooms/amenities", body);
  },
  addRateToRoom: async (body: IRateInRoom) => {
    return apiInstance.post("/rooms/rates", body);
  },
  updateRateInRoom: async (id: string, body: IRateInRoom) => {
    return apiInstance.put(`/rooms/rates/${id}`, body);
  },
  removeRateFromRoom: async (id: string) => {
    return apiInstance.delete(`/rooms/rates/${id}`);
  },
};
