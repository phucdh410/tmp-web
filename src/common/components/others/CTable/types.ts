import { IPagination } from "./CPagination/types";

export interface ICTableHeader<T> {
  key: keyof T;
  label: string;
  width?: string | number;
  align?: "center" | "left" | "right";
  colSpan?: number;
  render?: () => JSX.Element;
  cellRender?: (value: T[keyof T], record: T, index: number) => JSX.Element;
  pin?: string;
  style?: React.CSSProperties;
}

export interface ICTableProps<T extends object> {
  headers: ICTableHeader<T>[];
  data: T[];
  rowKey?: keyof T;
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
  isRowSelected?: (record: T) => boolean;
}
