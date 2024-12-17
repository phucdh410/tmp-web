import { apiInstance } from "@axios/index";
import {
  IReceipt,
  IReceiptDetail,
  IReceiptPaginationParams,
  IReceiptPayload,
  IReceiptUploadResponse,
} from "@interfaces/receipts";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const receiptsApi = {
  importExcel: async (body: FormData) => {
    return apiInstance.post("/receipts/import", body);
  },
  exportExcel: async (params: IReceiptPaginationParams) => {
    return apiInstance.get("/receipts/export", {
      params,
      responseType: "blob",
    });
  },
  getPaginate: async (
    params: IReceiptPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IReceipt>, any>> => {
    return apiInstance.get("/receipts", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/receipts/${id}`);
  },
  create: async (body: IReceiptPayload) => {
    return apiInstance.post("/receipts", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IReceiptDetail, any>> => {
    return apiInstance.get(`/receipts/${id}`);
  },
  update: async (id: number, body: IReceiptPayload) => {
    return apiInstance.put(`/receipts/${id}`, body);
  },
  uploadDocument: async (
    body: FormData
  ): Promise<IApiResponse<IReceiptUploadResponse, any>> => {
    return apiInstance.post("/receipts/files/upload", body);
  },
  getAll: async (): Promise<IApiResponse<IReceipt[], any>> => {
    return apiInstance.get("/receipts/all");
  },
};
