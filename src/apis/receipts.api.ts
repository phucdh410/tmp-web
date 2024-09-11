import { apiInstance } from "@axios/index";
import {
  IReceipt,
  IReceiptCode,
  IReceiptCodeParams,
  IReceiptPayload,
} from "@interfaces/receipts";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
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
  uploadDocument: async (body: FormData): Promise<IApiResponse<any, any>> => {
    return apiInstance.post("/receipts/files/upload");
  },
};
