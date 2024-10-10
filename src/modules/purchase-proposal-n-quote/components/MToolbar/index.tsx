import { PURCHASE_PROPOSAL_N_QUOTE_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker } from "@controls";
import { Stack } from "@mui/material";
import { CFilterInputWrapper } from "@others";

import { IMToolbar } from "./types";

export const MToolbar = ({ params, setParams }: IMToolbar) => {
  //#region Event
  const onFilterChange = (key: string) => (value: any) =>
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));
  //#endregion

  //#region Render
  return (
    <Stack
      mt={4}
      mb={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" gap={2}>
        <CFilterInputWrapper label="Trạng thái" minWidth={250}>
          <CAutocomplete
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={PURCHASE_PROPOSAL_N_QUOTE_STATUSES_OPTIONS}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Ngày đề xuất" minWidth={250}>
          <CDatepicker
            value={params?.suggest_date}
            onChange={onFilterChange("suggest_date")}
          />
        </CFilterInputWrapper>
      </Stack>
    </Stack>
  );
  //#endregion
};
