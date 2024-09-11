import { apiInstance } from "@axios/index";
import { ICategory } from "@interfaces/categories";
import { IApiResponse } from "@interfaces/response";

export const categoriesApi = {
  getAll: async (): Promise<IApiResponse<ICategory[], any>> => {
    return apiInstance.get("/categories/all");
  },
};
