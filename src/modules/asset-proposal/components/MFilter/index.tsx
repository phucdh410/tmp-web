import { ASSET_PROPOSAL_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker } from "@controls";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Event
  const onFilterChange = (key: string) => (value: any) =>
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));
  //#endregion

  //#region Render
  return (
    <CFilterContainer>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <CFilterInputWrapper label="Trạng thái" minWidth={250}>
          <CAutocomplete
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={ASSET_PROPOSAL_STATUSES_OPTIONS}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Ngày đề xuất" minWidth={250}>
          <CDatepicker
            value={params?.proposed_date}
            onChange={onFilterChange("proposed_date")}
          />
        </CFilterInputWrapper>
      </Stack>
    </CFilterContainer>
  );
  //#endregion
};
