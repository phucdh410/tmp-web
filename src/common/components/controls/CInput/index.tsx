import { forwardRef } from "react";

import { OutlinedInput } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICInputProps, ICInputRef } from "./types";

export const CInput = forwardRef<ICInputRef, ICInputProps>(
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
      type = "text",
      fullWidth = true,
      rows = undefined,
      onKeyDown,
      onEnter,
      ...props
    },
    ref
  ) => {
    //#region Event
    const onPresKeyDown = (
      event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      onKeyDown?.(event);

      if (event.key === "Enter") {
        onEnter?.();
      }
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <OutlinedInput
          id={props?.name}
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
          multiline={!!rows}
          rows={rows}
          onKeyDown={onPresKeyDown}
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
