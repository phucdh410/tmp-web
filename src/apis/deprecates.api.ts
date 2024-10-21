import { apiInstance } from "@axios/index";
import { IDeprecate } from "@interfaces/deprecates";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/transfer/types";

export const deprecatesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IDeprecate>, any>> => {
    return apiInstance.get("/deprecates", { params });
  },
  remove: async (id: string) => {
    return apiInstance.delete(`/issues/${id}`);
  },
  create: async (body: IIssuePayload) => {
    return apiInstance.post("/issues", body);
  },
  getById: async (id: string): Promise<IApiResponse<IIssueDetail, any>> => {
    return apiInstance.get(`/issues/${id}`);
  },
  update: async (id: string, body: IIssuePayload) => {
    return apiInstance.put(`/issues/${id}`, body);
  },
  exportExcel: async (params: IParams) => {
    return apiInstance.get("/issues/export", {
      params,
      responseType: "blob",
    });
  },
};
