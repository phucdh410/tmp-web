import { apiInstance } from "@axios/index";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";

export const paymentProposalsApi = {
  create: async (body: IPaymentProposalPayload) => {
    return apiInstance.post("/payment-proposal", body);
  },
};
