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
  sx?: SxProps;
  title?: string;
  dense?: boolean;
}

interface Selectable<T> {
  selectable: true;
  selection?: {
    pin?: boolean;
    isSelectedAll?: boolean;
    isIndeterminate?: boolean;
    selectedList?: T[];
    onSelect?: (items: T[]) => void;
    onSelectAll?: (isAll?: boolean) => void;
  };
}

interface NonSelect {
  selectable?: false;
  selection?: never;
}

type SelectableOrNonSelect<T> = Selectable<T> | NonSelect;

interface AutoPaginate {
  autoPaginate: true;
  pagination?: never;
}

interface Pagination {
  autoPaginate?: false;
  pagination?: IPagination;
}

type AutoPaginateOrPagination = AutoPaginate | Pagination;

interface NonVirtual {
  height?: number | string;
  virtual?: false;
}

interface Virtual {
  height: number | string;
  virtual: true;
}

type VirtualOrNonVirtual = NonVirtual | Virtual;

export type ICTableProps<T extends object> = (ICTablePropsBase<T> &
  VirtualOrNonVirtual) &
  SelectableOrNonSelect<T> &
  AutoPaginateOrPagination;
