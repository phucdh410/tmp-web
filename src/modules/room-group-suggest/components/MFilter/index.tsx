import { Controller, useForm } from "react-hook-form";

import { APPROVAL_STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CSelect } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { IRoomGroupSuggestPaginationParams } from "@interfaces/room-group-suggests";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilterProps } from "./types";

export const MFilter = ({ params, onAdd, onSearch }: IMFilterProps) => {
  //#region Data
  const { control, handleSubmit } = useForm<IRoomGroupSuggestPaginationParams>({
    mode: "all",
    defaultValues: {
      store_code: params?.store_code,
      status: params?.status,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    },
  });

  const { stores } = useGetAllStores();
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit((values) => {
      onSearch({ ...values, page: 1, limit: 10 });
    })();
  };
  //#endregion

  //#region Render
  return (
    <CFilterContainer>
      <Stack direction="row" alignItems="end" justifyContent="space-between">
        <Stack direction="row" flexWrap="wrap" gap={2}>
          <CFilterInputWrapper label="Chi nhánh" minWidth={220}>
            <Controller
              control={control}
              name="store_code"
              render={({ field }) => (
                <CAutocomplete options={stores} optionAll {...field} />
              )}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Trạng thái" minWidth={180}>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <CSelect
                  options={APPROVAL_STATUS_OPTIONS}
                  optionAll
                  {...field}
                />
              )}
            />
          </CFilterInputWrapper>
        </Stack>

        <Stack direction="row" gap={2}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm nhóm phòng</CButton>
        </Stack>
      </Stack>
    </CFilterContainer>
  );
  //#endregion
};
