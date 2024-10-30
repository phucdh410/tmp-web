import { Control } from "react-hook-form";

export interface IVendorInput {
  vendor_id: number;
}

export interface ICVendorInputProps<T extends IVendorInput> {
  control: Control<T, any>;
}
