import { forwardRef, useCallback } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  MenuItem,
  MenuProps,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { CFormControl } from "../CFormControl";

import { ICSelectProps, ICSelectRef } from "./types";

const menuProps: Partial<MenuProps> = {
  slotProps: {
    paper: {
      sx: {
        boxShadow: "0 6px 30px rgba(0, 0, 0, 0.08)",
        border: "1px solid #dcdfe4",
        marginTop: "4px",
        borderRadius: "8px",
      },
    },
  },
  MenuListProps: {
    sx: {
      padding: 1,
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
      color: "#212636",
      ".MuiMenuItem-root": {
        color: "inherit",
        padding: "6px 10px",
        borderRadius: "8px",
      },
    },
  },
};

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
          MenuProps={menuProps}
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
