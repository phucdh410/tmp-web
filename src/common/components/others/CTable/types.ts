import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { SORT_TYPES } from "@constants/enums";
import { SxProps } from "@mui/material";

import { IPagination } from "./CTableComponents/CPagination/types";

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

interface TagsColumnType<T> extends ICTableHeaderBase<T> {
  //note: With type is 'tags' your values should be array
  columnType: "tags";
  displayTag: string;
}

interface OptionColumnType<T> extends ICTableHeaderBase<T> {
  columnType: "option";
  options: IAutocompleteOption[];
}

export type ICTableHeader<T> =
  | OptionColumnType<T>
  | NonOptionColumnType<T>
  | TagsColumnType<T>;

export interface SelectionOptions<T> {
  pin?: boolean;
  type?: "checkbox" | "radio";
  isSelectedAll?: boolean;
  isIndeterminate?: boolean;
  hideSelectCol?: boolean;
  hideCheckAll?: boolean;
  selectByClickingRow?: boolean;
  selectedList?: T[];
  onSelect?: (newSelection: T[]) => void;
  onSelectAll?: (checked?: boolean) => void;
  getCheckboxDisable?: (record: T) => boolean;
}

export interface ICTablePropsBase<T extends object> {
  headers: ICTableHeader<T>[];
  data: T[];
  rowKey?: string;
  loading?: boolean;
  showIndexCol?: boolean;
  headerMultiline?: boolean;
  headerTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  fontSizeBody?: number;
  sx?: SxProps;
  title?: string;
  dense?: boolean;
  selection?: SelectionOptions<T>;
}

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
  AutoPaginateOrPagination;
