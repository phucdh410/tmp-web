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
  bodyRowSpan?: (value: any, record: T, index: number) => number;
}

interface NonOptionColumnType<T> extends ICTableHeaderBase<T> {
  columnType?: "any" | "number" | "date" | "datetime" | "input";
}

interface TagsColumnType<T> extends ICTableHeaderBase<T> {
  //note: With type is 'tags' your values should be array
  /**
   * Using column type "tags", you must add prop "displayTag"
   * @param displayTag is required
   * @param tagColor is optional
   */
  columnType: "tags";
  displayTag: string;
  tagColor?: string;
}

interface OptionColumnType<T> extends ICTableHeaderBase<T> {
  /**
   * Using column type "option", you must add prop "options"
   * @param options is required
   */
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

interface NonSpanData {
  headersWithSpanData?: never;
  getSpanData?: never;
}

interface HasSpanData<T extends object, F extends object> {
  headersWithSpanData: ICTableHeader<F>[];
  getSpanData: (row: T, index: number) => F[];
}

type SpanDataOrNonSpanData<T extends object, F extends object> =
  | NonSpanData
  | HasSpanData<T, F>;

export type ICTableProps<
  T extends object,
  F extends object = {}
> = (ICTablePropsBase<T> & VirtualOrNonVirtual) &
  AutoPaginateOrPagination &
  SpanDataOrNonSpanData<T, F>;
