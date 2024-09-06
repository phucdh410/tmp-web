import { apiInstance } from "@axios/index";

export const receiptsApi = {
  importExcel: async (body: FormData) => {
    return apiInstance.post("/receipts/import", body);
  },
};
