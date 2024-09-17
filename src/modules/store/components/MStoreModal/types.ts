import { IStoreResponse } from "@interfaces/stores";

export interface IMStoreModalRef {
  open: (editData?: IStoreResponse) => void;
}

export interface IMStoreModalProps {
  refetch?: () => void;
}
