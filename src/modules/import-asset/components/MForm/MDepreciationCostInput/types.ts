import { IMFormProps } from "../types";

export interface IMDepreciationCostInputProps
  extends Pick<IMFormProps, "control"> {
  disabled?: boolean;
}
