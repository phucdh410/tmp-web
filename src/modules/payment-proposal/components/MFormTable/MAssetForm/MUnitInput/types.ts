import { Control } from "react-hook-form";

import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMUnitInputProps {
  control: Control<IAssetInPaymentProposalPayload, any>;
}
