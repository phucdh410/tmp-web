import { Control } from "react-hook-form";

import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMCodeInputProps {
  control: Control<IAssetInPaymentProposalPayload, any>;
}
