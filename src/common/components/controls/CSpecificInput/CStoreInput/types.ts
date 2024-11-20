import { Control } from "react-hook-form";

export interface IStoreInput {
  store_code: string;
}

export interface ICStoreInputProps<T extends IStoreInput> {
  control: Control<T, any>;
  isEdit?: boolean;
  disabled?: boolean;
}
