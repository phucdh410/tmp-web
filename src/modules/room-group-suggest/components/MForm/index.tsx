import { useEffect } from "react";
import { Controller, useController } from "react-hook-form";

import { amenitiesApi } from "@apis/amenities.api";
import { storesApi } from "@apis/stores.api";
import { CAutocomplete, CInput, CNumberInput } from "@controls";
import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MAmenitiesTable } from "./MAmenitiesTable";
import { MCheckboxRegion } from "./MCheckboxRegion";
import { MRatesTable } from "./MRatesTable";
import { IMForm } from "./types";

export const MForm = ({ control }: IMForm) => {
  //#region Data
  const { data: STORES_OPTIONS } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => storesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.code, label: e?.name })),
  });

  const { data: TIEU_CHI_TIEN_ICH_OPTIONS } = useQuery({
    queryKey: ["danh-sach-tieu-chi-tien-ich-all"],
    queryFn: () => amenitiesApi.getAllCriteria(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.id, label: e?.name })),
  });

  const {
    field: { onChange: onCriteriaChange },
  } = useController({ control, name: "criteria_code" });
  //#endregion

  //#region Event

  //#endregion

  useEffect(() => {
    if (TIEU_CHI_TIEN_ICH_OPTIONS) {
      onCriteriaChange(TIEU_CHI_TIEN_ICH_OPTIONS[0].id);
    }
  }, [TIEU_CHI_TIEN_ICH_OPTIONS]);

  //#region Render
  return (
    <Stack mt={2} gap={5}>
      <Grid2 container columns={3} rowSpacing={2} columnSpacing={3}>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="store_code"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={STORES_OPTIONS ?? []}
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={2}></Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>Mã nhóm phòng</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} errorText={error?.message} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>Tên nhóm phòng</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} errorText={error?.message} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>Số chỗ ngồi</CFormLabel>
            <Controller
              control={control}
              name="seating_capacity"
              render={({ field, fieldState: { error } }) => (
                <CNumberInput
                  {...field}
                  suffix="/m2"
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>DT phòng từ</CFormLabel>
            <Controller
              control={control}
              name="floor_area_min"
              render={({ field, fieldState: { error } }) => (
                <CNumberInput
                  {...field}
                  suffix="m2"
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>DT phòng đến</CFormLabel>
            <Controller
              control={control}
              name="floor_area_max"
              render={({ field, fieldState: { error } }) => (
                <CNumberInput
                  {...field}
                  suffix="m2"
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel required>Giá thị trường</CFormLabel>
            <Controller
              control={control}
              name="market_price"
              render={({ field, fieldState: { error } }) => (
                <CNumberInput
                  {...field}
                  suffix="/h"
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel>Tiêu chí tiện ích</CFormLabel>
            <Controller
              control={control}
              name="criteria_code"
              render={({ field }) => (
                <CAutocomplete
                  {...field}
                  options={TIEU_CHI_TIEN_ICH_OPTIONS ?? []}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>

      <MCheckboxRegion control={control} />

      <Stack direction="row" gap={3}>
        <Stack flexShrink={0}>
          <MAmenitiesTable control={control} />
        </Stack>
        <Stack flex={1}>
          <MRatesTable control={control} />
        </Stack>
      </Stack>
    </Stack>
  );
  //#endregion
};
