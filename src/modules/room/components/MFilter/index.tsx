import { Controller, useForm } from "react-hook-form";

import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CSelect } from "@controls";
import { IRoomPaginationParams } from "@interfaces/rooms";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilterProps } from "./types";

export const MFilter = ({
  stores,
  params,
  onAdd,
  onSearch,
  room_groups_options,
}: IMFilterProps) => {
  //#region Data
  const { control, handleSubmit } = useForm<IRoomPaginationParams>({
    mode: "all",
    defaultValues: {
      status: params?.status,
      store_code: params?.store_code,
      room_group_id: params?.room_group_id,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    },
  });
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
          <CFilterInputWrapper label="Nhóm phòng" minWidth={250}>
            <Controller
              control={control}
              name="room_group_id"
              render={({ field }) => (
                <CAutocomplete
                  options={room_groups_options ?? []}
                  optionAll
                  {...field}
                />
              )}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Trạng thái" minWidth={180}>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <CSelect options={STATUS_OPTIONS} optionAll {...field} />
              )}
            />
          </CFilterInputWrapper>
        </Stack>

        <Stack direction="row" gap={2}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm phòng</CButton>
        </Stack>
      </Stack>
    </CFilterContainer>
  );
  //#endregion
};
