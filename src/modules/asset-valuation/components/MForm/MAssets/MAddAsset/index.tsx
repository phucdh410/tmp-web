import { Controller, useForm, useWatch } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { ASSET_VALUATION_TYPES } from "@constants/enums";
import { ASSET_VALUATION_TYPES_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CButton,
  CCategoryInput,
  CRadioButton,
} from "@controls";
import { Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMAddAssetProps } from "./types";

const DEFAULT_VALUES = {
  category_id: -1,
  asset_id: -1,
  type: ASSET_VALUATION_TYPES.REMAINING_DEPRECIATION,
};

export const MAddAsset = ({ onAddNewAsset }: IMAddAssetProps) => {
  //#region Data
  const { control, handleSubmit, reset, watch } = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });

  const category_id = useWatch({ control, name: "category_id" });
  const type = useWatch({ control, name: "type" });

  const { data: assetsOptions = [], isFetching } = useQuery({
    queryKey: ["danh-sach-tai-san-theo-loai-ccdc", category_id, type],
    queryFn: () => assetsApi.getAll({ category_id, depreciation: type }),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        label: `${e.name}-${e.code}`,
        ...e,
      })),
    enabled: category_id !== -1,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      const matchAsset = assetsOptions.find((e) => e.id === values.asset_id);
      if (matchAsset) {
        onAddNewAsset({
          asset_id: values.asset_id,
          name: matchAsset.name,
          code: matchAsset.code,
          valuation_note: "",
          valuation_value: 0,
        });
        reset(DEFAULT_VALUES);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <Paper variant="tool-card" sx={{ p: 2 }}>
      <Stack
        direction="row"
        gap={2}
        justifyContent="space-between"
        alignItems="end"
      >
        <Stack gap={1.3} minWidth={500}>
          <CFormInputWrapper gap={1} percent={{ label: 25, input: 75 }}>
            <CFormLabel required>Loại CCDC</CFormLabel>
            <CCategoryInput control={control} />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 25, input: 75 }}>
            <CFormLabel required>Loại định giá</CFormLabel>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <CRadioButton
                  options={ASSET_VALUATION_TYPES_OPTIONS}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 25, input: 75 }}>
            <CFormLabel required>Tên CCDC</CFormLabel>
            <Controller
              control={control}
              name="asset_id"
              render={({ field }) => (
                <CAutocomplete
                  {...field}
                  loading={isFetching}
                  options={assetsOptions}
                  placeholder="Chọn tài sản"
                />
              )}
            />
          </CFormInputWrapper>
        </Stack>
        <CButton
          onClick={onSubmit}
          disabled={category_id === -1 || watch("asset_id") === -1}
        >
          Thêm tài sản
        </CButton>
      </Stack>
    </Paper>
  );
  //#endregion
};
