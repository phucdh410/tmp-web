import { forwardRef } from "react";

import { RadioGroup } from "@mui/material";
import classNames from "classnames";

import { StyledFormControlLabel, StyledRadio } from "./StyledComponents";
import { ICRadioButtonProps, ICRadioButtonRef } from "./types";

export const CRadioButton = forwardRef<ICRadioButtonRef, ICRadioButtonProps>(
  ({ options, row = true, value, onChange, className, ...props }, ref) => {
    //#region Event
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof value === "number") {
        onChange?.(Number(event.target.value));
      } else {
        onChange?.(event.target.value);
      }
    };
    //#endregion

    //#region Render
    return (
      <RadioGroup
        className={classNames("c-radio-group", className)}
        row={row}
        value={value}
        onChange={onInputChange}
        sx={{ paddingLeft: "3px" }}
      >
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<StyledRadio />}
          />
        ))}
      </RadioGroup>
    );
    //#endregion
  }
);
