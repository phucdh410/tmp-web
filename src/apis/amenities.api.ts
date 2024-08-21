//! TIỆN ÍCH PHÒNG

import { apiInstance } from "@axios/index";

export const amenitiesApi = {
  getAllCriteria: async () => {
    return apiInstance.get("/amenities/criteria");
  },
  getAllAmenities: async (params) => {
    return apiInstance.get("/amenities/all", { params });
  },
  getById: async (id) => {
    return apiInstance.get(`/amenities/${id}`);
  },
  create: async (body) => {
    return apiInstance.post("/amenities", body);
  },
  update: async (id, body) => {
    return apiInstance.put(`/amenities/${id}`, body);
  },
  remove: async (id) => {
    return apiInstance.delete(`/amenities/${id}`);
  },
};
