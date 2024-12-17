import { IMFormTableProps } from "../../types";

export interface IMAssetSelectionCellProps
  extends Pick<IMFormTableProps, "control" | "setValue"> {
  index: number;
  display: string;
}
