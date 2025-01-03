import { SELL_ASSET_STATUES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput, CSelect } from "@controls";
import { useDebounceSearch } from "@hooks/debounce";
import { useGetAllWarehouses } from "@hooks/options";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Data
  const [code, setCode] = useDebounceSearch({
    getDebounceValue: (newCode) =>
      setParams((prev) => ({ ...prev, page: 1, code: newCode })),
  });

  const { warehouses } = useGetAllWarehouses();
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
        <CFilterInputWrapper label="Số chứng từ" minWidth={200}>
          <CInput value={code} onChange={onCodeChange} placeholder="Tất cả" />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Kho xuất" minWidth={200}>
          <CAutocomplete
            value={params?.store_code}
            onChange={onFilterChange("store_code")}
            optionAll
            options={warehouses}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Trạng thái" minWidth={200}>
          <CSelect
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={SELL_ASSET_STATUES_OPTIONS}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Từ ngày" minWidth={200}>
          <CDatepicker
            value={params?.start_date}
            onChange={onFilterChange("start_date")}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Đến ngày" minWidth={200}>
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
