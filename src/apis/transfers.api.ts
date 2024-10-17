import { apiInstance } from "@axios/index";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import {
  ITransfer,
  ITransferDetail,
  ITransferPayload,
} from "@interfaces/transfers";
import { IParams } from "@modules/transfer/types";

export const transfersApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<ITransfer>, any>> => {
    return apiInstance.get("/transfers", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/transfers/${id}`);
  },
  create: async (body: ITransferPayload) => {
    return apiInstance.post("/transfers", body);
  },
  getById: async (id: string): Promise<IApiResponse<ITransferDetail, any>> => {
    return apiInstance.get(`/transfers/${id}`);
  },
  update: async (id: string, body: ITransferPayload) => {
    return apiInstance.put(`/transfers/${id}`, body);
  },
  exportExcel: async (params: IParams) => {
    return apiInstance.get("/transfers/export", {
      params,
      responseType: "blob",
    });
  },
};
