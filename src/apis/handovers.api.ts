import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
import {
  IHandover,
  IHandoverDetail,
  IHandoverPayload,
} from "@interfaces/handovers";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/handover/types";

export const handoversApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IHandover>, any>> => {
    return apiInstance.get("/handovers", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/handovers/${id}`);
  },
  create: async (body: IHandoverPayload) => {
    return apiInstance.post("/handovers", body);
  },
  getById: async (id: string): Promise<IApiResponse<IHandoverDetail, any>> => {
    return apiInstance
      .get(`/handovers/${id}`)
      .then((response) =>
        modifyResponseStringToNumber(response, [
          "id",
          "asset_id",
          "handover_user_id",
          "receiver_user_id",
        ])
      );
  },
  update: async (id: string, body: IHandoverPayload) => {
    return apiInstance.put(`/handovers/${id}`, body);
  },
};
