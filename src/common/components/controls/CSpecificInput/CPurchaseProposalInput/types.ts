import { Control } from "react-hook-form";

import { ASSET_PROPOSAL_STATUSES } from "@constants/enums";

export interface IPurchaseProposalInput {
  document_code?: string;
}

export interface ICPurchaseProposalInputProps<
  T extends IPurchaseProposalInput
> {
  control: Control<T, any>;
  isEdit?: boolean;
  status?: ASSET_PROPOSAL_STATUSES;
}
