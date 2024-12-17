import { UseFormSetValue } from "react-hook-form";

import { ITransferPayload } from "@interfaces/transfers";

import { IMFormProps } from "../MForm/types";

export interface IMFormTableProps
  extends Pick<IMFormProps, "control" | "isEdit"> {
  setValue: UseFormSetValue<ITransferPayload>;
}
