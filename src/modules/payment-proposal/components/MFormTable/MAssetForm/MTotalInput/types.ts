import { Control } from "react-hook-form";

import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMTotalInputProps {
  control: Control<IAssetInPaymentProposalPayload, any>;
}
