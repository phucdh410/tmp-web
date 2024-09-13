import { ICreatedVendorResponse, IVendor } from "@interfaces/vendors";

export interface IMVendorModalRef {
  open: (editData?: IVendor, initialName?: string) => void;
}

export interface IMVendorModalProps {
  refetch?: () => void;
  getSucceededData?: (data: ICreatedVendorResponse) => void;
}
