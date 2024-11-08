import { HTMLInputTypeAttribute } from "react";

import { InputProps } from "@mui/material";

//note: INTERFACE CHO FORM & INPUT
export interface IFormInputComponentRef {
  blur: () => void;
  focus: () => void;
}

export interface IFormInputComponentProps<T = any> {
  id?: string; //note: Đây là id của input trên DOM nên là string
  name?: string;
  className?: string;
  value?: T | null;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  onKeyDown?: (
    event: React.KeyboardEvent<
      HTMLDivElement | HTMLLabelElement | HTMLTextAreaElement
    >
  ) => void;
}

export interface ICommonCInputProps extends IFormInputComponentProps {
  placeholder?: string;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  InputProps?: InputProps;
}
