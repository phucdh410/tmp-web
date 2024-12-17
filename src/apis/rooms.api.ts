import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  IRateInRoom,
  IRoom,
  IRoomDetail,
  IRoomPaginationParams,
  IRoomPayload,
  IUpdateAmenitiesInRoomPayload,
} from "@interfaces/rooms";

export const roomsApi = {
  getPaginate: async (
    params?: IRoomPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IRoom>, any>> => {
    return apiInstance.get("/rooms", { params });
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IRoomDetail, any>> => {
    return apiInstance.get(`/rooms/${id}`);
  },
  create: async (body: IRoomPayload) => {
    return apiInstance.post("/rooms", body);
  },
  update: async (id: number, body: IRoomPayload) => {
    return apiInstance.put(`/rooms/${id}`, body);
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/rooms/${id}`);
  },
  updateAmenitiesInRoom: async (body: IUpdateAmenitiesInRoomPayload) => {
    return apiInstance.post("/rooms/amenities", body);
  },
  addRateToRoom: async (body: IRateInRoom) => {
    return apiInstance.post("/rooms/rates", body);
  },
  updateRateInRoom: async (id: number, body: IRateInRoom) => {
    return apiInstance.put(`/rooms/rates/${id}`, body);
  },
  removeRateFromRoom: async (id: number) => {
    return apiInstance.delete(`/rooms/rates/${id}`);
  },
};
