import { DateValidationError } from "@mui/x-date-pickers";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import { Dayjs } from "dayjs";

import { IDateRangeValues } from "../types";

export enum SelectFor {
  START = "start",
  END = "end",
}

export interface ICalendarRef {
  showCalendar: (target: HTMLElement, role: SelectFor) => void;
}

export interface ICalendarProps {
  value: IDateRangeValues;
  onInputChange: (
    key: "start" | "end"
  ) => (
    changedValue: Dayjs | null,
    context?: FieldChangeHandlerContext<DateValidationError>
  ) => void;
}
