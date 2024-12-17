//! TIỆN ÍCH PHÒNG

import { apiInstance } from "@axios/index";
import { IAmenity, IAmenityPayload, ICriteria } from "@interfaces/amenities";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IUtilityPaginationParams } from "@interfaces/rooms";

export const amenitiesApi = {
  getAllCriteria: async (): Promise<IApiResponse<ICriteria[], any>> => {
    return apiInstance.get("/amenities/criteria");
  },
  getPaginate: async (
    params: IUtilityPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IAmenity>, any>> => {
    return apiInstance.get("/amenities", { params });
  },
  getById: async (id: number | string) => {
    return apiInstance.get(`/amenities/${id}`);
  },
  create: async (body: IAmenityPayload) => {
    return apiInstance.post("/amenities", body);
  },
  update: async (id: number, body: IAmenityPayload) => {
    return apiInstance.put(`/amenities/${id}`, body);
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/amenities/${id}`);
  },
  getAll: async (params?: {
    amenity_criteria_code?: string;
  }): Promise<IApiResponse<IAmenity[], any>> => {
    return apiInstance.get("/amenities/all", { params });
  },
};
