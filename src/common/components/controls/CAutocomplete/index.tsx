import { forwardRef, useMemo, useRef, useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
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
      error = false,
      errorText = "",
      hoverable = false,
      disablePortal = false,
      ...props
    },
    ref
  ) => {
    //#region Data
    const popperRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

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

    const onAutocompleteChange = (
      event: React.SyntheticEvent,
      selectedOption: IAutocompleteOption | null,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
    ) => {
      onChange?.(
        selectedOption?.[get] ?? undefined,
        event,
        selectedOption,
        reason,
        details
      );

      if (hoverable) {
        setOpen(false);
      }
    };

    const onMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
      setOpen(true);
    };

    const onMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
      if (popperRef.current) {
        const rect = popperRef.current.getBoundingClientRect();
        const { clientX: x, clientY: y } = event;

        const isOutside =
          x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;

        if (isOutside) {
          setOpen(false);
        } else {
          // console.log("Con trỏ nằm trong div");
        }
      }
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
          onChange={onAutocompleteChange}
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
          //?: Customize for hoverable to open dropdown
          open={hoverable ? open : undefined}
          disablePortal={hoverable ?? disablePortal}
          onMouseEnter={hoverable ? onMouseEnter : undefined}
          onMouseLeave={hoverable ? onMouseLeave : undefined}
          slotProps={{
            popper: hoverable
              ? {
                  onMouseLeave: () => setOpen(false),
                  ref: popperRef,
                }
              : undefined,
          }}
          //?: Customize for hoverable to open dropdown
        />
      </CFormControl>
    );
    //#endregion
  }
);
