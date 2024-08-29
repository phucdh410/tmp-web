import { Controller, useForm } from "react-hook-form";

import { CAutocomplete, CButton, CInput } from "@controls";
import { IParams } from "@modules/position/types";
import { Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFilterProps } from "./types";

export const MFilter = ({
  options,
  params,
  onAdd,
  onSearch,
  PLACES_OPTIONS,
}: IMFilterProps) => {
  //#region Data
  const { control, handleSubmit } = useForm<IParams>({
    mode: "all",
    defaultValues: {
      code: params?.code,
      name: params?.name,
      store_code: params?.store_code,
      place_code: params?.place_code,
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
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Mã vị trí</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput {...field} placeholder="Mã vị trí" />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Chi nhánh/Văn phòng</CFormLabel>
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
          </CFormInputWrapper>
        </Stack>
        <Stack direction="column" gap={2} flex={2 / 5}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Tên vị trí</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CInput {...field} placeholder="Tên vị trí" />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Khu vực</CFormLabel>
            <Controller
              control={control}
              name="place_code"
              render={({ field }) => (
                <CAutocomplete
                  options={[
                    { id: "", label: "Tất cả" },
                    ...(PLACES_OPTIONS?.length > 0 ? [...PLACES_OPTIONS] : []),
                  ]}
                  {...field}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1} flex={1 / 5}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm vị trí</CButton>
        </Stack>
      </Stack>
    </Paper>
  );
  //#endregion
};
