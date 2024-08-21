import { IPagination } from "./CPagination/types";

export interface ICTableHeader {
  key: string;
  label: string;
  width?: string;
  align?: "center" | "left" | "right";
  colSpan?: number;
  render?: () => JSX.Element;
  cellRender?: (data: any) => JSX.Element;
  pin?: string;
  style?: React.CSSProperties;
}

export interface ICTableProps {
  headers: ICTableHeader[];
  data: any[];
  rowKey?: string;
  loading?: boolean;
  showIndexCol?: boolean;
  headerMultiline?: boolean;
  headerTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  fontSizeBody?: number;
  pagination?: IPagination;
  onRowClick?: (rowData: any) => void;
  isRowSelected?: (rowData: any) => boolean;
}
