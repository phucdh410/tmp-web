import { apiInstance } from "@axios/index";
import {
  ICategoryPaginationParams,
  ICategoryPayload,
  ICategoryResponse,
  ICreatedCategoryResponse,
} from "@interfaces/categories";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const categoriesApi = {
  getAll: async (): Promise<IApiResponse<ICategoryResponse[], any>> => {
    return apiInstance.get("/categories/all");
  },
  getPaginate: async (
    params: ICategoryPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<ICategoryResponse>, any>> => {
    return apiInstance.get("/categories", { params });
  },
  create: async (
    body: ICategoryPayload
  ): Promise<IApiResponse<ICreatedCategoryResponse, any>> => {
    return apiInstance.post("/categories", body);
  },
  update: async (id: number, body: ICategoryPayload) => {
    return apiInstance.put(`/categories/${id}`, body);
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/categories/${id}`);
  },
};
