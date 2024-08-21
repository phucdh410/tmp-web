export interface IPagination {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  total?: number;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  getDataByPageInput?: (page: number, limit: number) => void;
  showPageSize?: boolean;
  showGoTo?: boolean;
  showTotal?: boolean;
}
