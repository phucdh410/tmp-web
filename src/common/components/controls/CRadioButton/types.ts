import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import { RadioGroupProps } from "@mui/material";

export interface ICRadioButtonRef extends IFormInputComponentRef {}

export interface ICRadioButtonProps extends IFormInputComponentProps {
  options: IRadioButtonOption[];
  row?: RadioGroupProps["row"];
}

export interface IRadioButtonOption {
  value: string | number;
  label: string;
}
