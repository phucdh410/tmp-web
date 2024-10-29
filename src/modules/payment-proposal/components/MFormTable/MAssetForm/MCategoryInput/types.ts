import { Control } from "react-hook-form";

import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMCategoryInputProps {
  control: Control<IAssetInPaymentProposalPayload, any>;
}
