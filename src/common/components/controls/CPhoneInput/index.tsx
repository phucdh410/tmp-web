import { forwardRef } from "react";

import { OutlinedInput } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICPhoneInputProps, ICPhoneInputRef } from "./types";

export const CPhoneInput = forwardRef<ICPhoneInputRef, ICPhoneInputProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder,
      error = false,
      errorText = "",
      readOnly = false,
      disabled = false,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    //#region Event
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      const numericValue = inputValue.replace(/\D/g, "");
      onChange?.(numericValue);
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <OutlinedInput
          className={classNames("c-input", className)}
          inputRef={ref}
          readOnly={readOnly}
          disabled={disabled}
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder={placeholder}
          error={error}
          fullWidth={fullWidth}
          inputMode="numeric"
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
