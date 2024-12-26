import { forwardRef, useCallback } from "react";

import { ExpandMore } from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

import { CFormControl } from "../CFormControl";

import { ICSelectProps, ICSelectRef } from "./types";

export const CSelect = forwardRef<ICSelectRef, ICSelectProps>(
  (
    {
      options,
      error,
      errorText,
      fullWidth = true,
      value,
      onChange,
      id,
      disabled,
      placeholder,
      optionAll,
      ...props
    },
    ref
  ) => {
    //#region Event
    const onInputChange = (event: SelectChangeEvent<any>) => {
      onChange?.(event.target.value);
    };

    const renderValue = useCallback(
      (selectedValue: any) => {
        if (value === "" && optionAll) return "Tất cả";
        if (value !== 0 && !value && placeholder) {
          return (
            <Typography
              sx={{
                color: (theme) => theme.palette.disabledInputText.main,
              }}
            >
              {placeholder}
            </Typography>
          );
        }
        return options.find((e) => e.id === selectedValue)?.label ?? "";
      },
      [options, optionAll, value, placeholder]
    );
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <Select
          className="c-select"
          id={id}
          value={value}
          onChange={onInputChange}
          fullWidth={fullWidth}
          disabled={disabled}
          error={error}
          IconComponent={ExpandMore}
          displayEmpty
          renderValue={renderValue}
          // renderValue={(selected) => {
          //   console.log("🚀 ~ selected:", selected);
          //   if (placeholder)
          //     return (
          //       <Typography
          //         sx={{
          //           color: (theme) => theme.palette.disabledInputText.main,
          //         }}
          //       >
          //         {placeholder}
          //       </Typography>
          //     );
          //     else return options[]
          // }}
          {...props}
        >
          {optionAll && <MenuItem value="">Tất cả</MenuItem>}
          {options.map((option, index) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </CFormControl>
    );
    //#endregion
  }
);
