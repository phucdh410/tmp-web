import { apiInstance } from "@axios/index";
import {
  ICategoryPayload,
  ICategoryResponse,
  ICreatedCategoryResponse,
} from "@interfaces/categories";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/category/types";

export const categoriesApi = {
  getAll: async (): Promise<IApiResponse<ICategoryResponse[], any>> => {
    return apiInstance.get("/categories/all");
  },
  getPaginate: async (
    params: IParams
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
