export interface IMDetailModalRef {
  open: (id: number) => void;
}

export interface IMDetailModalProps {
  listRefetch: () => void;
}
