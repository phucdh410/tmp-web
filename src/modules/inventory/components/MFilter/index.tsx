import { CAutocomplete, CDatepicker } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Data
  const { stores } = useGetAllStores();
  //#endregion

  //#region Event
  const onFilterChange = (key: string) => (value: any) =>
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));
  //#endregion

  //#region Render
  return (
    <CFilterContainer>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <CFilterInputWrapper label="Từ ngày" minWidth={250}>
          <CDatepicker
            value={params?.start_date}
            onChange={onFilterChange("start_date")}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Đến ngày" minWidth={250}>
          <CDatepicker
            value={params?.end_date}
            onChange={onFilterChange("end_date")}
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
