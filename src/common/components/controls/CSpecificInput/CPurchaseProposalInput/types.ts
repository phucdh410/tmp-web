import { Control } from "react-hook-form";

export interface IPurchaseProposalInput {
  document_code?: string;
}

export interface ICPurchaseProposalInputProps<
  T extends IPurchaseProposalInput
> {
  control: Control<T, any>;
  isEdit?: boolean;
}
