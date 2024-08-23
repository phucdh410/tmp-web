import { apiInstance } from "@axios/index";

export const positionsApi = {
  getAll: async (params) => {
    return apiInstance.get("/places/positions", { params });
  },
  getById: async (id: string) => {
    return apiInstance.get(`/places/positions/${id}`);
  },
  create: async (body) => {
    return apiInstance.post("/places/positions", body);
  },
  update: async (id: string, body) => {
    return apiInstance.put(`/places/positions/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/places/positions/${id}`);
  },
};
