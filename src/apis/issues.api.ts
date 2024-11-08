import { apiInstance } from "@axios/index";
import { IIssue, IIssueDetail, IIssuePayload } from "@interfaces/issues";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/transfer/types";

export const issuesApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IIssue>, any>> => {
    return apiInstance.get("/issues", { params });
  },
  remove: async (id: number) => {
    return apiInstance.delete(`/issues/${id}`);
  },
  create: async (body: IIssuePayload) => {
    return apiInstance.post("/issues", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IIssueDetail, any>> => {
    return apiInstance.get(`/issues/${id}`);
  },
  update: async (id: number, body: IIssuePayload) => {
    return apiInstance.put(`/issues/${id}`, body);
  },
  exportExcel: async (params: IParams) => {
    return apiInstance.get("/issues/export", {
      params,
      responseType: "blob",
    });
  },
};
