import { apiInstance } from "@axios/index";
import {
  IReceipt,
  IReceiptCode,
  IReceiptCodeParams,
  IReceiptDetail,
  IReceiptPayload,
} from "@interfaces/receipts";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IUploadResponse } from "@interfaces/upload";
import { IParams } from "@modules/receipt/types";

export const receiptsApi = {
  importExcel: async (body: FormData) => {
    return apiInstance.post("/receipts/import", body);
  },
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IReceipt>, any>> => {
    return apiInstance.get("/receipts", { params });
  },
  getCodes: async (
    params?: IReceiptCodeParams
  ): Promise<IApiResponse<IReceiptCode[], any>> => {
    return apiInstance.get("/receipts/codes", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/receipts/${id}`);
  },
  create: async (body: IReceiptPayload) => {
    return apiInstance.post("/receipts", body);
  },
  getById: async (id: string): Promise<IApiResponse<IReceiptDetail, any>> => {
    return apiInstance.get(`/receipts/${id}`);
  },
  update: async (id: string, body: IReceiptPayload) => {
    return apiInstance.put(`/receipts/${id}`, body);
  },
  uploadDocument: async (
    body: FormData
  ): Promise<IApiResponse<IUploadResponse, any>> => {
    return apiInstance.post("/receipts/files/upload", body);
  },
};
