import { ICreatedVendorResponse, IVendorResponse } from "@interfaces/vendors";

export interface IMVendorModalRef {
  open: (editData?: IVendorResponse, initialName?: string) => void;
}

export interface IMVendorModalProps {
  refetch?: () => void;
  getSucceededData?: (data: ICreatedVendorResponse) => void;
}
