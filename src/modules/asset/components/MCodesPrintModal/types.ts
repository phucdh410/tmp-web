export interface IMCodesPrintModalRef {
  open: (
    idsList?: number[],
    store_code?: string,
    region_id?: number | ""
  ) => void;
}

export interface IMCodesPrintModalProps {}
