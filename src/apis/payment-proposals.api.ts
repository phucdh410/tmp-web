import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
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
  remove: async (id: string) => {
    return apiInstance.delete(`/payment-requests/${id}`);
  },
  create: async (body: IPaymentProposalPayload) => {
    return apiInstance.post("/payment-requests", body);
  },
  getById: async (
    id: string
  ): Promise<IApiResponse<IPaymentProposalDetail, any>> => {
    return apiInstance
      .get(`/payment-requests/${id}`)
      .then((response) =>
        modifyResponseStringToNumber(response, [
          "id",
          "store_id",
          "vendor_id",
          "acceptance_id",
          "receipt_id",
          "payment_request_id",
          "category_id",
        ])
      );
  },
  update: async (id: string, body: IPaymentProposalPayload) => {
    return apiInstance.put(`/payment-requests/${id}`, body);
  },
};
