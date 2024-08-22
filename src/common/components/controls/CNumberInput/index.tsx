import { forwardRef, useMemo, useState } from "react";

import { ALLOWED_NUMBER_KEYS, THOUSAND_SEPARATOR } from "@constants/variables";
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
      error = false,
      errorText = "",
      readOnly = false,
      disabled = false,
      fullWidth = true,
      thousand_seperator = ",",
      ...props
    },
    ref
  ) => {
    //#region Data
    const [prevKey, setPrevKey] = useState("");

    const displayValue = useMemo(() => {
      if (!value) return 0;

      return value.toLocaleString(THOUSAND_SEPARATOR[thousand_seperator]);
    }, [value]);
    //#endregion

    //#region Event
    const onKeyDown = (
      event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setPrevKey(event.key);

      if (prevKey === "Control" && (event.key === "v" || event.key === "c")) {
        return event;
      }

      if (!ALLOWED_NUMBER_KEYS.includes(event.key)) {
        event.preventDefault();
      }
    };

    const onValueChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      let tmpValue = event.target.value;

      tmpValue = tmpValue.replace(/\D/g, "");

      onChange?.(Number(tmpValue));
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
          inputMode="numeric"
          value={displayValue}
          onChange={onValueChange}
          placeholder={placeholder}
          error={error}
          fullWidth={fullWidth}
          onKeyDown={onKeyDown}
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
