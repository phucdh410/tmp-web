import { forwardRef, useMemo } from "react";

import { CalendarMonthOutlined } from "@mui/icons-material";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";

import { CFormControl } from "../CFormControl";

import { ICDatepickerProps, ICDatepickerRef } from "./types";

import "./styles.scss";

export const CDatepicker = forwardRef<ICDatepickerRef, ICDatepickerProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder,
      views = undefined,
      format = "DD/MM/YYYY",
      disabled = false,
      disablePast = false,
      disableFuture = false,
      error = false,
      errorText = "",
      reduceAnimations = true,
      hidePickerIcon = false,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    //#region Data
    const currentValue = useMemo(() => {
      if (!value) return null;
      return dayjs(value);
    }, [value]);
    //#endregion

    //#region Event
    const onValueChange = (
      newValue: Dayjs | null,
      context: PickerChangeHandlerContext<DateValidationError>
    ) => {
      if (newValue) {
        const result = dayjs(newValue).toDate();
        onChange?.(result);
      } else {
        onChange?.(null);
      }
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <DatePicker
          {...props}
          dayOfWeekFormatter={(date) => date.format("dd")}
          reduceAnimations
          value={currentValue}
          onChange={onValueChange}
          views={views}
          format={format}
          disabled={disabled}
          disablePast={disablePast}
          disableFuture={disableFuture}
          className={classNames("c-datepicker", className)}
          slotProps={{
            textField: { placeholder: placeholder ?? format, fullWidth },
            inputAdornment: {
              sx: { display: hidePickerIcon ? "none" : "flex" },
            },
          }}
          slots={{
            openPickerIcon: CalendarMonthOutlined,
          }}
        />
      </CFormControl>
    );
    //#endregion
  }
);
