import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { Popover } from "@mui/material";
import { DateCalendar, DateView } from "@mui/x-date-pickers";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import dayjs, { Dayjs } from "dayjs";

import { ICalendarProps, ICalendarRef, SelectFor } from "./types";

const minDate = dayjs().subtract(8, "year").startOf("year");
const maxDate = dayjs().add(8, "year").endOf("year");

export const CCalendar = forwardRef<ICalendarRef, ICalendarProps>(
  ({ value, onInputChange }, ref) => {
    //#region Data
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [selectFor, setSelectFor] = useState<SelectFor>(SelectFor.START);

    const calendarValue = useMemo(
      () =>
        selectFor === SelectFor.START
          ? value.start
            ? dayjs(value.start)
            : null
          : value.end
          ? dayjs(value.end)
          : null,
      [selectFor, value]
    );
    //#endregion

    //#region Event
    const onClose = () => {
      setAnchorEl(null);
      setSelectFor(SelectFor.START);
    };

    const onChange = (
      selectedValue: any,
      selectionState?: PickerSelectionState,
      selectedView?: DateView | undefined
    ) => {
      if (selectionState === "finish" && selectedView === "day") {
        onInputChange?.(selectFor)(selectedValue);
        onClose();
      }
    };

    const shouldDisableDate = useCallback(
      (day: Dayjs) => {
        if (selectFor === SelectFor.START && value.end) {
          return day.isAfter(value.end);
        } else if (selectFor === SelectFor.END && value.start) {
          return day.isBefore(value.start);
        } else {
          return false;
        }
      },
      [selectFor, value]
    );
    //#endregion

    useImperativeHandle(ref, () => ({
      showCalendar: (target, role) => {
        setSelectFor(role);

        setAnchorEl(target);
      },
    }));

    //#region Render
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            },
          },
        }}
      >
        <DateCalendar
          dayOfWeekFormatter={(date) => date.format("dd")}
          value={calendarValue}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          shouldDisableDate={shouldDisableDate}
          reduceAnimations
        />
      </Popover>
    );
    //#endregion
  }
);
