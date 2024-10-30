import { Control } from "react-hook-form";

export interface IPropertyInput {
  properties: number[];
}

export interface ICPropertyInputProps<T extends IPropertyInput> {
  control: Control<T, any>;
}
