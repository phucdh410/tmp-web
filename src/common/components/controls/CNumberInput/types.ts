import { ICommonCInputProps, IFormInputComponentRef } from "@interfaces/form";

export interface ICNumberInputRef extends IFormInputComponentRef {}

export interface ICNumberInputProps extends ICommonCInputProps {
  thousand_seperator?: "." | ",";
  suffix?: React.ReactNode;
  max?: number;
  min?: number;
  formatter?: (currentValue: any) => void;
  parser?: (currentValue: any) => number;
}
