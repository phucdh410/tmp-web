import { Stack } from "@mui/material";
import { CFilterInputWrapper } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Event
  // const onFilterChange = (key: string) => (value: any) =>
  //   setParams((prev) => ({ ...prev, page: 1, [key]: value }));
  //#endregion

  //#region Render
  return (
    <Stack
      mb={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" gap={2}>
        <CFilterInputWrapper label="Trạng thái" minWidth={250}>
          {/* <CAutocomplete
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={PAYMENT_PROPOSAL_STATUSES_OPTIONS}
          /> */}
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Ngày đề xuất" minWidth={250}>
          {/* <CDatepicker
            value={params?.suggest_date}
            onChange={onFilterChange("suggest_date")}
          /> */}
        </CFilterInputWrapper>
      </Stack>
    </Stack>
  );
  //#endregion
};
