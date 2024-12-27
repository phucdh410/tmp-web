import { useState } from "react";

import { IDateRangeValues } from "@components/controls/CRangeInput/types";
import { PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDateRangeInput, CSelect } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";
import dayjs, { Dayjs } from "dayjs";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Event
  const [date, setDate] = useState<IDateRangeValues>({
    start: null,
    end: null,
  });
  const [needDate, setNeedDate] = useState<IDateRangeValues>({
    start: null,
    end: null,
  });

  const { stores } = useGetAllStores();
  //#endregion

  //#region Event
  const onFilterChange = (key: string) => (value: any) =>
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));

  const onRangeChange =
    (key: string) => (value: { start: Dayjs; end: Dayjs }) => {
      if (key === "date") setDate(value);
      else if (key === "needed_date") setNeedDate(value);
      if (value.start === null && value.end === null) {
        setParams((prev) => ({
          ...prev,
          page: 1,
          start_date: "",
          end_date: "",
        }));
      } else if (dayjs(value.start).isValid() && dayjs(value.end).isValid()) {
        if (key === "date") {
          setParams((prev) => ({
            ...prev,
            page: 1,
            start_date: value.start,
            end_date: value.end,
          }));
        } else if (key === "needed_date") {
          setParams((prev) => ({
            ...prev,
            page: 1,
            start_needed_date: value.start,
            end_needed_date: value.end,
          }));
        }
      }
    };
  //#endregion

  //#region Render
  return (
    <CFilterContainer>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <CFilterInputWrapper label="Ngày đề xuất" minWidth={250}>
          <CDateRangeInput
            value={{ start: date.start, end: date.end }}
            onChange={onRangeChange("date")}
            defaultValues={{ start: null, end: null }}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Ngày cần" minWidth={250}>
          <CDateRangeInput
            value={{ start: needDate.start, end: needDate.end }}
            onChange={onRangeChange("needed_date")}
            defaultValues={{ start: null, end: null }}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Trạng thái" minWidth={250}>
          <CSelect
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Chi nhánh" minWidth={250}>
          <CAutocomplete
            value={params?.store_code}
            onChange={onFilterChange("store_code")}
            optionAll
            options={stores}
          />
        </CFilterInputWrapper>
      </Stack>
    </CFilterContainer>
  );
  //#endregion
};
