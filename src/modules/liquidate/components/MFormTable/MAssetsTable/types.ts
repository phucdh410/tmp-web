import { IMFormProps } from "../../MForm/types";
import { IMFormTableProps } from "../types";

export interface IMAssetsTableProps
  extends Pick<IMFormProps, "control" | "isEdit">,
    Pick<IMFormTableProps, "setValue"> {}
