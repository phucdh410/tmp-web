import { Controller, useForm } from "react-hook-form";

import { APPROVAL_STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { IParams } from "@modules/room-group-suggest/types";
import { Paper, Stack } from "@mui/material";
import { CFormLabel } from "@others";

import { IMFilterProps } from "./types";

export const MFilter = ({ params, onAdd, onSearch }: IMFilterProps) => {
  //#region Data
  const { control, handleSubmit } = useForm<IParams>({
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
    <Paper variant="tool-card" sx={{ mt: 3 }}>
      <Stack
        px={8}
        py={4}
        gap={4}
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flex={1 / 3}
        >
          <CFormLabel>Chi nhánh</CFormLabel>
          <Controller
            control={control}
            name="store_code"
            render={({ field }) => (
              <CAutocomplete options={stores} optionAll {...field} />
            )}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flex={1 / 3}
        >
          <CFormLabel>Trạng thái</CFormLabel>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <CAutocomplete
                options={APPROVAL_STATUS_OPTIONS}
                optionAll
                {...field}
              />
            )}
          />
        </Stack>

        <Stack direction="row" alignItems="center" gap={1} flex={1 / 3}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm nhóm phòng</CButton>
        </Stack>
      </Stack>
    </Paper>
  );
  //#endregion
};
