import { apiInstance } from "@axios/index";
import {
  IPaymentProposal,
  IPaymentProposalDetail,
  IPaymentProposalPaginationParams,
  IPaymentProposalPayload,
} from "@interfaces/payment-proposals";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";

export const paymentProposalsApi = {
  getPaginate: async (
    params: IPaymentProposalPaginationParams
  ): Promise<IApiResponse<IPaginateResponse<IPaymentProposal>, any>> => {
    return apiInstance.get("/payment-requests", { params });
  },
  remove: async (id: number | string) => {
    return apiInstance.delete(`/payment-requests/${id}`);
  },
  create: async (body: IPaymentProposalPayload) => {
    return apiInstance.post("/payment-requests", body);
  },
  getById: async (
    id: number | string
  ): Promise<IApiResponse<IPaymentProposalDetail, any>> => {
    return apiInstance.get(`/payment-requests/${id}`);
  },
  update: async (id: number | string, body: IPaymentProposalPayload) => {
    return apiInstance.put(`/payment-requests/${id}`, body);
  },
  approve: async (id: number | string) => {
    return apiInstance.put(`/payment-requests/approve/${id}`);
  },
  reject: async (id: number | string) => {
    return apiInstance.put(`/payment-requests/reject/${id}`);
  },
};
