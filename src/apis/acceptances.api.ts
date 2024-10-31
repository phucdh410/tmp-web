import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
import {
  IAcceptance,
  IAcceptanceDetail,
  IAcceptancePayload,
} from "@interfaces/acceptances";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/acceptance/types";

export const acceptancesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IAcceptance>, any>> => {
    return apiInstance.get("/acceptances", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/acceptances/${id}`);
  },
  create: async (body: IAcceptancePayload) => {
    return apiInstance.post("/acceptances", body);
  },
  getById: async (
    id: string
  ): Promise<IApiResponse<IAcceptanceDetail, any>> => {
    return apiInstance
      .get(`/acceptances/${id}`)
      .then((response) =>
        modifyResponseStringToNumber(response, ["id", "store_id", "vendor_id"])
      );
  },
  update: async (id: string, body: IAcceptancePayload) => {
    return apiInstance.put(`/acceptances/${id}`, body);
  },
  getAll: async (): Promise<IApiResponse<IAcceptance[], any>> => {
    return apiInstance
      .get("/acceptances/all")
      .then((response) => modifyResponseStringToNumber(response, ["id"]));
  },
};
