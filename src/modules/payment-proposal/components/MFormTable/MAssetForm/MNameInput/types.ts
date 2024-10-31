import { Control } from "react-hook-form";

import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMNameInputProps {
  control: Control<IAssetInPaymentProposalPayload, any>;
}
