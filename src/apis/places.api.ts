import { apiInstance } from "@axios/index";
import { IPlacePayload } from "@interfaces/places";
import { IParams } from "@modules/place/types";

export const placesApi = {
  getAll: async (params: IParams) => {
    return apiInstance.get("/places", { params });
  },
  getById: async (id: string) => {
    return apiInstance.get(`/places/${id}`);
  },
  create: async (body: IPlacePayload) => {
    return apiInstance.post("/places", body);
  },
  update: async (id: string, body: IPlacePayload) => {
    return apiInstance.put(`/places/${id}`, body);
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/places/${id}`);
  },
};
