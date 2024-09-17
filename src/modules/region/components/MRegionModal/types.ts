import { IRegionResponse } from "@interfaces/regions";

export interface IMRegionModalRef {
  open: (editData?: IRegionResponse) => void;
}

export interface IMRegionModalProps {
  refetch?: () => void;
}
