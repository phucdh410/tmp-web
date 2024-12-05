import { forwardRef, useCallback, useMemo, useState } from "react";

import { ALLOWED_NUMBER_KEYS } from "@constants/variables";
import { debounce, InputAdornment, OutlinedInput } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { defaultFormatter, defaultParser } from "./funcs";
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
      suffix,
      min,
      max,
      formatter = defaultFormatter,
      parser = defaultParser,
      ...props
    },
    ref
  ) => {
    //#region Data
    const [prevKey, setPrevKey] = useState("");

    const displayValue = useMemo(() => {
      return formatter(value);
    }, [value, formatter]);
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

    const debounceCorrectValue = useCallback(
      debounce((newValue: number) => {
        if (min || max) {
          let numValue = newValue;
          if (max && numValue > max) numValue = max;
          if (min && numValue < min) numValue = min;
          onChange?.(numValue);
        }
      }, 650),
      [min, max]
    );

    const onValueChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const tmpValue = parser(event.target.value);

      if (min || max) debounceCorrectValue(tmpValue);
      onChange?.(tmpValue);
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <OutlinedInput
          className={classNames("c-input c-number-input", className)}
          inputRef={ref}
          readOnly={readOnly}
          disabled={disabled}
          type="text"
          inputMode="decimal"
          endAdornment={
            suffix ? (
              <InputAdornment position="end">{suffix}</InputAdornment>
            ) : undefined
          }
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
