import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  ITransfer,
  ITransferDetail,
  ITransferPaginationParams,
  ITransferPayload,
} from "@interfaces/transfers";

export const transfersApi = {
  getPaginate: async (
    params: ITransferPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<ITransfer>, any>> => {
    return apiInstance.get("/transfers", { params });
  },
  remove: async (id: number | string) => {
    return apiInstance.delete(`/transfers/${id}`);
  },
  create: async (body: ITransferPayload) => {
    return apiInstance.post("/transfers", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<ITransferDetail, any>> => {
    return apiInstance.get(`/transfers/${id}`);
  },
  update: async (id: number | string, body: ITransferPayload) => {
    return apiInstance.put(`/transfers/${id}`, body);
  },
  exportExcel: async (params: ITransferPaginationParams) => {
    return apiInstance.get("/transfers/export", {
      params,
      responseType: "blob",
    });
  },
};
