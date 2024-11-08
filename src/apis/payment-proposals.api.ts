import { apiInstance } from "@axios/index";
import {
  IPaymentProposal,
  IPaymentProposalDetail,
  IPaymentProposalPayload,
} from "@interfaces/payment-proposals";
import { IApiResponse, IPaginateResponse } from "@interfaces/response";
import { IParams } from "@modules/payment-proposal/types";

export const paymentProposalsApi = {
  getPaginate: async (
    params: IParams
  ): Promise<IApiResponse<IPaginateResponse<IPaymentProposal>, any>> => {
    return apiInstance.get("/payment-requests", { params });
  },
  remove: async (id: number) => {
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
  update: async (id: number, body: IPaymentProposalPayload) => {
    return apiInstance.put(`/payment-requests/${id}`, body);
  },
};
