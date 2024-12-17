import { Controller, useForm } from "react-hook-form";

import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton } from "@controls";
import { IUtilityPaginationParams } from "@interfaces/rooms";
import { Stack } from "@mui/material";
import { CFilterContainer, CFilterInputWrapper } from "@others";

import { IMFilterProps } from "./types";

export const MFilter = ({
  options,
  params,
  onAdd,
  onSearch,
}: IMFilterProps) => {
  //#region Data
  const { control, handleSubmit } = useForm<IUtilityPaginationParams>({
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
    <CFilterContainer>
      <Stack direction="row" alignItems="end" justifyContent="space-between">
        <Stack direction="row" flexWrap="wrap" gap={2}>
          <CFilterInputWrapper label="Tiêu chí tiện ích" minWidth={250}>
            <Controller
              control={control}
              name="amenity_criteria_code"
              render={({ field }) => (
                <CAutocomplete options={options ?? []} optionAll {...field} />
              )}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Trạng thái" minWidth={170}>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <CAutocomplete options={STATUS_OPTIONS ?? []} {...field} />
              )}
            />
          </CFilterInputWrapper>
        </Stack>
        <Stack direction="row" gap={2}>
          <CButton onClick={onSubmit}>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm tiện ích</CButton>
        </Stack>
      </Stack>
    </CFilterContainer>
  );
  //#endregion
};
