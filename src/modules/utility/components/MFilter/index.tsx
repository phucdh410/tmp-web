import { Controller, useForm } from "react-hook-form";

import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton } from "@controls";
import { IParams } from "@modules/utility/types";
import { Paper, Stack } from "@mui/material";
import { CFormLabel } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ options, params, onAdd, onSearch }: IMFilter) => {
  //#region Data
  const { control, handleSubmit } = useForm<IParams>({
    mode: "all",
    defaultValues: {
      amenity_criteria_code: params?.amenity_criteria_code,
      status: params?.status,
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
      <Stack
        px={8}
        py={4}
        gap={8}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" gap={5} flex={1 / 3}>
          <CFormLabel>Tiêu chí tiện ích</CFormLabel>
          <Controller
            control={control}
            name="amenity_criteria_code"
            render={({ field }) => (
              <CAutocomplete
                options={[
                  { id: "", label: "Tất cả" },
                  ...(options?.length > 0 ? [...options] : []),
                ]}
                {...field}
              />
            )}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={5} flex={1 / 3}>
          <CFormLabel required>Trạng thái</CFormLabel>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <CAutocomplete options={STATUS_OPTIONS ?? []} {...field} />
            )}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} flex={1 / 3}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm tiện ích</CButton>
        </Stack>
      </Stack>
    </Paper>
  );
  //#endregion
};
