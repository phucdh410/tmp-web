import { Control } from "react-hook-form";

import {
  IApproveHandoverPayload,
  IHandoverDetail,
} from "@interfaces/handovers";

export interface IMApproveFormProps {
  control: Control<IApproveHandoverPayload>;
  handoverData?: IHandoverDetail;
}
