import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  IRoomGroupSuggest,
  IRoomGroupSuggestDetail,
  IRoomGroupSuggestPayload,
  IUpdateAmenitiesInRoomGroupPayload,
} from "@interfaces/room-group-suggests";
import { IParams } from "@modules/room-group-suggest/types";

export const roomGroupSuggestApi = {
  getPaginate: async (
    params?: IParams
  ): Promise<IApiResponse<IPaginateResponse<IRoomGroupSuggest>, any>> => {
    return apiInstance.get("/room-groups", { params });
  },
  getById: async (
    id: string
  ): Promise<IApiResponse<IRoomGroupSuggestDetail, any>> => {
    return apiInstance.get(`/room-groups/${id}`);
  },
  create: async (body: IRoomGroupSuggestPayload) => {
    return apiInstance.post("/room-groups", body);
  },
  update: async (id: string, body: IRoomGroupSuggestPayload) => {
    return apiInstance.put(`/room-groups/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/room-groups/${id}`);
  },
  updateAmenitiesInRoomGroup: async (
    body: IUpdateAmenitiesInRoomGroupPayload
  ) => {
    return apiInstance.post("/room-groups/amenities", body);
  },
};
