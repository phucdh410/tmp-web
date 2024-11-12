import { forwardRef, useMemo } from "react";

import { CalendarMonthOutlined, ExpandMore } from "@mui/icons-material";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { CFormControl } from "../CFormControl";

import { ICDatepickerProps, ICDatepickerRef } from "./types";

dayjs.extend(updateLocale);
dayjs.updateLocale("vi", {
  monthsShort: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
});

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
      showDaysOutsideCurrentMonth = false,
      minDate = dayjs().subtract(10, "year").startOf("year"),
      maxDate = dayjs().add(10, "year").endOf("year"),
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
          minDate={minDate}
          maxDate={maxDate}
          value={currentValue}
          onChange={onValueChange}
          views={views}
          format={format}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          disabled={disabled}
          disablePast={disablePast}
          disableFuture={disableFuture}
          className={classNames("c-datepicker", className)}
          slotProps={{
            textField: { placeholder: placeholder ?? format, fullWidth, error },
            inputAdornment: {
              sx: { display: hidePickerIcon ? "none" : "flex" },
            },
          }}
          slots={{
            switchViewIcon: ExpandMore,
            openPickerIcon: CalendarMonthOutlined,
          }}
        />
      </CFormControl>
    );
    //#endregion
  }
);
