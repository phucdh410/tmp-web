import { IPaymentProposalPaginationParams } from "@interfaces/payment-proposals";

export interface IMFilter {
  params: IPaymentProposalPaginationParams;
  setParams: React.Dispatch<
    React.SetStateAction<IPaymentProposalPaginationParams>
  >;
}
