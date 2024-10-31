import { Control } from "react-hook-form";

import { IPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMFormProps {
  control: Control<IPaymentProposalPayload, any>;
  isEdit?: boolean;
}
