import { forwardRef, useMemo, useRef, useState } from "react";

import { Stack } from "@mui/material";
import { DateField, DateValidationError } from "@mui/x-date-pickers";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";

import { ICalendarRef, SelectFor } from "./CCalendar/types";
import { CCalendar } from "./CCalendar";
import { CClearButtonTooltip } from "./CClearButtonTooltip";
import {
  ICDateRangeInputProps,
  ICDateRangeInputRef,
  IDateRangeValues,
} from "./types";

import "./styles.scss";

export const CDateRangeInput = forwardRef<
  ICDateRangeInputRef,
  ICDateRangeInputProps
>(({ error, value, onChange, defaultValues }, ref) => {
  //#region Data
  const calendarRef = useRef<ICalendarRef>(null);

  const formattedValues = useMemo<IDateRangeValues>(() => {
    if (!value) return { start: null, end: null };
    return {
      start: value.start,
      end: value.end,
    };
  }, [value]);

  const [focus, setFocus] = useState<"" | "start" | "end">("");

  const isError = useMemo(() => {
    if (error) return true;
    else if (formattedValues.start && !formattedValues.end) return true;
    else if (formattedValues.end && !formattedValues.start) return true;
    else if (
      formattedValues.end &&
      formattedValues.start &&
      dayjs(formattedValues.start).isAfter(dayjs(formattedValues.end))
    )
      return true;
    return false;
  }, [formattedValues, error]);
  //#endregion

  //#region Event
  const onFocus = (key: "start" | "end") => () => setFocus(key);

  const onBlur = (key: "start" | "end") => () => {
    if (
      (focus === "start" && key === "start") ||
      (focus === "end" && key === "end")
    )
      setFocus("");
  };

  const onInputChange =
    (key: "start" | "end") =>
    (
      changedValue: Dayjs | null,
      context?: FieldChangeHandlerContext<DateValidationError>
    ) => {
      if (key === "start") {
        onChange?.({ ...formattedValues, start: changedValue });
      }
      if (key === "end") {
        onChange?.({ ...formattedValues, end: changedValue });
      }
    };

  const onDoubleClick =
    (role: SelectFor) => (event: React.MouseEvent<HTMLDivElement>) => {
      calendarRef.current?.showCalendar(event.currentTarget, role);
    };

  const onReset = () => {
    console.log("🤣 defaultValues at line 82 🤣:", defaultValues);
    if (defaultValues) onChange?.(defaultValues);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CClearButtonTooltip onClick={onReset}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classNames(
            "c-rangepicker-wrapper",
            focus && "focused",
            isError && "error"
          )}
        >
          <DateField
            value={formattedValues.start ? dayjs(formattedValues.start) : null}
            onChange={onInputChange("start")}
            onFocus={onFocus("start")}
            onBlur={onBlur("start")}
            className={classNames("c-datepicker c-rangepicker--start")}
            onDoubleClick={onDoubleClick(SelectFor.START)}
          />
          <span>—</span>
          <DateField
            value={formattedValues.end ? dayjs(formattedValues.end) : null}
            onChange={onInputChange("end")}
            onFocus={onFocus("end")}
            onBlur={onBlur("end")}
            className={classNames("c-datepicker c-rangepicker--end")}
            onDoubleClick={onDoubleClick(SelectFor.END)}
          />
        </Stack>
      </CClearButtonTooltip>

      <CCalendar
        ref={calendarRef}
        onInputChange={onInputChange}
        value={formattedValues}
      />
    </>
  );
  //#endregion
});
