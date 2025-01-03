import { ICommonCInputProps, IFormInputComponentRef } from "@interfaces/form";

export interface ICInputRef extends IFormInputComponentRef {}

export interface ICInputProps extends ICommonCInputProps {
  rows?: string | number;
  onEnter?: () => void;
}
