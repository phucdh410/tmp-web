//! TIỆN ÍCH PHÒNG

import { apiInstance } from "@axios/index";
import { IAmenity, IAmenityPayload, ICriteria } from "@interfaces/amenities";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/utility/types";

export const amenitiesApi = {
  getAllCriteria: async (): Promise<IApiResponse<ICriteria[], any>> => {
    return apiInstance.get("/amenities/criteria");
  },
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IAmenity>, any>> => {
    return apiInstance.get("/amenities", { params });
  },
  getById: async (id: string) => {
    return apiInstance.get(`/amenities/${id}`);
  },
  create: async (body: IAmenityPayload) => {
    return apiInstance.post("/amenities", body);
  },
  update: async (id: string, body: IAmenityPayload) => {
    return apiInstance.put(`/amenities/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/amenities/${id}`);
  },
  getAll: async (params?: {
    amenity_criteria_code?: string;
  }): Promise<IApiResponse<IAmenity[], any>> => {
    return apiInstance.get("/amenities/all", { params });
  },
};
