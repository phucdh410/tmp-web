import { ICTableHeader, ICTableProps } from "../../types";

export interface ICHeaderCellProps<T extends object>
  extends Pick<ICTableProps<T>, "headerMultiline" | "headerTransform"> {
  header: ICTableHeader<T>;
}
