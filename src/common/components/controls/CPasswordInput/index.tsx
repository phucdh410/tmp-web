import { forwardRef, useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICPasswordInputProps, ICPasswordInputRef } from "./types";

export const CPasswordInput = forwardRef<
  ICPasswordInputRef,
  ICPasswordInputProps
>(
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
      fullWidth,
      ...props
    },
    ref
  ) => {
    //#region Data
    const [visible, setVisible] = useState(false);
    //#endregion

    //#region Event
    const onToggle = () => setVisible(!visible);
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <OutlinedInput
          className={classNames("c-input", className)}
          inputRef={ref}
          readOnly={readOnly}
          disabled={disabled}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          fullWidth={fullWidth}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onToggle} sx={{ color: "#acc5ff" }}>
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
