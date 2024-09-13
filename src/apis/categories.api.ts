import { apiInstance } from "@axios/index";
import {
  ICategory,
  ICategoryPayload,
  ICreatedCategoryResponse,
} from "@interfaces/categories";
import { IApiResponse } from "@interfaces/response";

export const categoriesApi = {
  getAll: async (): Promise<IApiResponse<ICategory[], any>> => {
    return apiInstance.get("/categories/all");
  },
  create: async (
    body: ICategoryPayload
  ): Promise<IApiResponse<ICreatedCategoryResponse, any>> => {
    return apiInstance.post("/categories", body);
  },
  update: async (id: string, body: ICategoryPayload) => {
    return apiInstance.post(`/categories/${id}`, body);
  },
};
