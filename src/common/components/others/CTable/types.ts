import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { SORT_TYPES } from "@constants/enums";
import { SxProps } from "@mui/material";

import { IPagination } from "./CPagination/types";

export type TCTableHeaders<T> = ICTableHeader<T>[];

export interface ICTableHeaderBase<T> {
  //A //B
  key: string;
  dataMapKey?: keyof T;
  columnKey?: string;
  label: string;
  width?: string | number;
  align?: "center" | "left" | "right";
  rowSpan?: number;
  colSpan?: number;
  render?: () => JSX.Element;
  cellRender?: (value: any, record: T, index: number) => JSX.Element;
  pin?: "right" | "left";
  style?: React.CSSProperties;
  bodyCellStyle?: React.CSSProperties;
  sorter?: SORT_TYPES;
  toggleSort?: () => void;
  children?: ICTableHeader<T>[];
}

interface NonOptionColumnType<T> extends ICTableHeaderBase<T> {
  columnType?: "any" | "number" | "date" | "datetime";
}

interface OptionColumnType<T> extends ICTableHeaderBase<T> {
  columnType: "option";
  options: IAutocompleteOption[];
}

export type ICTableHeader<T> = OptionColumnType<T> | NonOptionColumnType<T>;

export interface ICTablePropsBase<T extends object> {
  headers: ICTableHeader<T>[];
  data: T[];
  rowKey?: string;
  loading?: boolean;
  showIndexCol?: boolean;
  headerMultiline?: boolean;
  headerTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  fontSizeBody?: number;
  onRowClick?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    record: T,
    index: number
  ) => void;
  selectable?: boolean;
  pinSelectCol?: boolean;
  sx?: SxProps;
  selectedOutside?: {
    isSelectedAll: boolean;
    isIndeterminate: boolean;
    selected: T[];
    select: (items: T[]) => void;
    selectAll: (isAll?: boolean) => void;
  };
  title?: string;
  dense?: boolean;
  height?: number | string;
}

interface ICTablePropsWithPagination<T extends object>
  extends ICTablePropsBase<T> {
  pagination: IPagination;
  autoPaginate?: never;
}

interface ICTablePropsAutoPaginate<T extends object>
  extends ICTablePropsBase<T> {
  autoPaginate: true;
  pagination?: never;
}

type ICTablePropsNonVirtual<T extends object> = (
  | ICTablePropsWithPagination<T>
  | ICTablePropsAutoPaginate<T>
) & {
  virtual?: false;
};

type ICTablePropsVirtual<T extends object> = (
  | ICTablePropsWithPagination<T>
  | ICTablePropsAutoPaginate<T>
) &
  (Omit<ICTablePropsBase<T>, "height"> & {
    height: number | string;
    virtual: true;
  });

export type ICTableProps<T extends object> =
  | ICTablePropsNonVirtual<T>
  | ICTablePropsVirtual<T>;
