import { ACCEPTANCE_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput, CSelect } from "@controls";
import { useDebounceSearch } from "@hooks/debounce";
import { useGetAllStores } from "@hooks/options";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Data
  const [code, setCode] = useDebounceSearch({
    getDebounceValue: (newCode) =>
      setParams((prev) => ({ ...prev, page: 1, code: newCode })),
  });

  const { stores } = useGetAllStores();
  //#endregion

  //#region Event
  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const onFilterChange = (key: string) => (value: any) =>
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));
  //#endregion

  //#region Render
  return (
    <CFilterContainer>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <CFilterInputWrapper label="Số chứng từ" minWidth={250}>
          <CInput value={code} onChange={onCodeChange} placeholder="Tất cả" />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Chi nhánh" minWidth={250}>
          <CAutocomplete
            value={params?.store_code}
            onChange={onFilterChange("store_code")}
            optionAll
            options={stores}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Trạng thái" minWidth={250}>
          <CSelect
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={ACCEPTANCE_STATUSES_OPTIONS}
          />
        </CFilterInputWrapper>
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
      </Stack>
    </CFilterContainer>
  );
  //#endregion
};
