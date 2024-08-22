import { forwardRef, useMemo } from "react";

import { ExpandMore } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import {
  IAutocompleteOption,
  ICAutocompleteProps,
  ICAutocompleteRef,
} from "./types";

export const CAutocomplete = forwardRef<ICAutocompleteRef, ICAutocompleteProps>(
  (
    {
      value,
      onChange,
      className,
      disableClearable = true,
      options = [],
      placeholder,
      fullWidth = true,
      get = "id",
      display = "label",
      error,
      errorText,
      ...props
    },
    ref
  ) => {
    //#region Data
    const currentValue = useMemo(() => {
      if (typeof value === "string" || typeof value === "number") {
        const found = options.find((opt) => opt[get] === value);
        return found ?? null;
      } else if (typeof value === "object") {
        const found = options.find((opt) => opt[get] === value[get]);
        return found ?? null;
      }
    }, [value, options, get]);
    //#endregion

    //#region Event
    // const isOptionEqualToValue = (option: IAutocompleteOption, value: any) => {
    //   if (typeof value !== "object") {
    //     return option[get] === value;
    //   } else {
    //     return option[get] === value[get];
    //   }
    // };

    const getOptionLabel = (option: IAutocompleteOption) => {
      return option[display] ?? option;
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <Autocomplete
          {...props}
          value={currentValue}
          popupIcon={<ExpandMore />}
          fullWidth={fullWidth}
          className={classNames("c-autocomplete", className)}
          disableClearable={disableClearable}
          options={options}
          onChange={onChange}
          getOptionLabel={getOptionLabel}
          // isOptionEqualToValue={isOptionEqualToValue}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              placeholder={placeholder}
              error={error}
            />
          )}
        />
      </CFormControl>
    );
    //#endregion
  }
);
