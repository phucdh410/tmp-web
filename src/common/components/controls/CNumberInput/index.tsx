import { forwardRef } from "react";

import { OutlinedInput } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICNumberInputProps, ICNumberInputRef } from "./types";

export const CNumberInput = forwardRef<ICNumberInputRef, ICNumberInputProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder,
      error,
      errorText,
      readOnly,
      disabled,
      type = "text",
      fullWidth,
      ...props
    },
    ref
  ) => {
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <OutlinedInput
          className={classNames("c-input", className)}
          inputRef={ref}
          readOnly={readOnly}
          disabled={disabled}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          fullWidth={fullWidth}
          {...props}
        />
      </CFormControl>
    );
  }
);
