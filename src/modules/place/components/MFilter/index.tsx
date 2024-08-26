import { Controller, useForm } from "react-hook-form";

import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CInput } from "@controls";
import { IParams } from "@modules/place/types";
import { Paper, Stack } from "@mui/material";
import { CFormLabel } from "@others";

import { IMFilter } from "./types";

export const MFilter = ({ options, params, onAdd, onSearch }: IMFilter) => {
  //#region Data
  const { control, handleSubmit } = useForm<IParams>({
    mode: "all",
    defaultValues: {
      code: params?.code,
      name: params?.name,
      store_code: params?.store_code,
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
        gap={4}
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Stack direction="column" gap={2} flex={2 / 5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ "> div": { flexBasis: "60%" }, label: { flexBasis: "40%" } }}
          >
            <CFormLabel>Mã khu vực</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput {...field} placeholder="Mã khu vực" />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ "> div": { flexBasis: "60%" }, label: { flexBasis: "40%" } }}
          >
            <CFormLabel required>Chi nhánh/Văn phòng</CFormLabel>
            <Controller
              control={control}
              name="store_code"
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
        </Stack>
        <Stack direction="column" gap={2} flex={2 / 5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ "> div": { flexBasis: "60%" }, label: { flexBasis: "40%" } }}
          >
            <CFormLabel>Tên khu vực</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CInput {...field} placeholder="Tên khu vực" />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ "> div": { flexBasis: "60%" }, label: { flexBasis: "40%" } }}
          >
            <CFormLabel required>Trạng thái</CFormLabel>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <CAutocomplete options={STATUS_OPTIONS ?? []} {...field} />
              )}
            />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1} flex={1 / 5}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm khu vực</CButton>
        </Stack>
      </Stack>
    </Paper>
  );
  //#endregion
};