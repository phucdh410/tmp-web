import { Control } from "react-hook-form";

import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMAmountInputProps {
  control: Control<IAssetInPaymentProposalPayload, any>;
}
