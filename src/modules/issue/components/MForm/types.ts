import { Control } from "react-hook-form";

import { IIssuePayload } from "@interfaces/issues";

export interface IMFormProps {
  control: Control<IIssuePayload, any>;
  isEdit?: boolean;
}
