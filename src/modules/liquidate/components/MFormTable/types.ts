import { UseFormSetValue } from "react-hook-form";

import { ILiquidatePayload } from "@interfaces/liquidates";

import { IMFormProps } from "../MForm/types";

export interface IMFormTableProps
  extends Pick<IMFormProps, "control" | "isEdit"> {
  setValue: UseFormSetValue<ILiquidatePayload>;
}
