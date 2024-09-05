import { Controller, useForm } from "react-hook-form";

import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton } from "@controls";
import { IParams } from "@modules/room/types";
import { Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFilterProps } from "./types";

export const MFilter = ({
  options,
  params,
  onAdd,
  onSearch,
  room_groups_options,
}: IMFilterProps) => {
  //#region Data
  const { control, handleSubmit } = useForm<IParams>({
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
    <Paper variant="tool-card" sx={{ mt: 3 }}>
      <Stack px={8} py={4} gap={2}>
        <Stack direction="row" gap={8}>
          <Stack direction="column" gap={2} flex={1 / 3}>
            <CFormInputWrapper percent={{ label: 40, input: 60 }}>
              <CFormLabel>Chi nhánh</CFormLabel>
              <Controller
                control={control}
                name="store_code"
                render={({ field }) => (
                  <CAutocomplete options={options ?? []} optionAll {...field} />
                )}
              />
            </CFormInputWrapper>
          </Stack>
          <Stack direction="column" gap={2} flex={1 / 3}>
            <CFormInputWrapper percent={{ label: 40, input: 60 }}>
              <CFormLabel>Nhóm phòng</CFormLabel>
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
            </CFormInputWrapper>
          </Stack>
          <Stack direction="column" gap={2} flex={1 / 3}>
            <CFormInputWrapper percent={{ label: 40, input: 60 }}>
              <CFormLabel>Trạng thái</CFormLabel>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CAutocomplete
                    options={STATUS_OPTIONS}
                    optionAll
                    {...field}
                  />
                )}
              />
            </CFormInputWrapper>
          </Stack>
        </Stack>

        <Stack
          alignSelf="end"
          direction="row"
          alignItems="center"
          gap={1}
          flex={1 / 4}
        >
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm phòng</CButton>
        </Stack>
      </Stack>
    </Paper>
  );
  //#endregion
};
