import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { SORT_TYPES } from "@constants/enums";
import { SxProps } from "@mui/material";

import { IPagination } from "./CPagination/types";

export type TCTableHeaders<T> = ICTableHeader<T>[];

export interface ICTableHeaderBase<T> {
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

export interface ICTableProps<T extends object> {
  headers: ICTableHeader<T>[];
  data: T[];
  rowKey?: string;
  loading?: boolean;
  showIndexCol?: boolean;
  headerMultiline?: boolean;
  headerTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  fontSizeBody?: number;
  pagination?: IPagination;
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
  autoPaginate?: boolean;
}
