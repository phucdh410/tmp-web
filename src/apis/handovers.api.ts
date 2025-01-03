import { apiInstance } from "@axios/index";
import {
  IApproveHandoverPayload,
  IHandover,
  IHandoverDetail,
  IHandoverPaginationParams,
  IHandoverPayload,
} from "@interfaces/handovers";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const handoversApi = {
  getPaginate: async (
    params: IHandoverPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IHandover>, any>> => {
    return apiInstance.get("/handovers", { params });
  },
  remove: async (id: number | string) => {
    return apiInstance.delete(`/handovers/${id}`);
  },
  create: async (body: IHandoverPayload) => {
    return apiInstance.post("/handovers", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IHandoverDetail, any>> => {
    return apiInstance.get(`/handovers/${id}`);
  },
  update: async (id: number | string, body: IHandoverPayload) => {
    return apiInstance.put(`/handovers/${id}`, body);
  },
  approve: async (id: number | string, body: IApproveHandoverPayload) => {
    return apiInstance.put(`/handovers/${id}/approval`, body);
  },
};
