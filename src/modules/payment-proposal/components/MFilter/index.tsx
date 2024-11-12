import { useState } from "react";

import { PAYMENT_PROPOSAL_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { useDebounce } from "@hooks/debounce";
import { useGetAllStores } from "@hooks/options";
import { Stack } from "@mui/material";
import { CFilterInputWrapper } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ params, setParams }: IMFilter) => {
  //#region Data
  const [code, setCode] = useState(params?.code ?? "");

  const { stores } = useGetAllStores();
  //#endregion

  //#region Event
  const debounceSearch = useDebounce(
    (newCode: string) =>
      setParams((prev) => ({ ...prev, page: 1, code: newCode })),
    400
  );

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
    debounceSearch(event.target.value);
  };

  const onFilterChange = (key: string) => (value: any) =>
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));
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
          <CAutocomplete
            value={params?.status}
            onChange={onFilterChange("status")}
            optionAll
            options={PAYMENT_PROPOSAL_STATUSES_OPTIONS}
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
    </Stack>
  );
  //#endregion
};
