import { apiInstance } from "@axios/index";
import { IReceipt } from "@interfaces/receipts";
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
};
