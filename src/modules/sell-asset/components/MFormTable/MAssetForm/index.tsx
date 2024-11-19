import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { WARRANTY_LEVELS } from "@constants/enums";
import { WARRANTY_LEVELS_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CButton,
  CCategoryInput,
  CDatepicker,
  CInput,
  CNumberInput,
  CPropertyInput,
  CQuantityItem,
} from "@controls";
import { IAssetInSellAssetPayload } from "@interfaces/sell-assets";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MTotalInput } from "./MTotalInput";
import { IMAssetFormProps, IMAssetFormRef } from "./types";

const DEFAULT_VALUES: IAssetInSellAssetPayload = {
  category_id: -1,
  description: "",
  gia_ban: 0,
  gia_nhap: 0,
  name: "",
  properties: [],
  quantity: 1,
  total: 0,
  unit: "",
  warranty_date: new Date(),
  warranty_duration: 0,
  warranty_level: WARRANTY_LEVELS.MONTH,
};

export const MAssetForm = forwardRef<IMAssetFormRef, IMAssetFormProps>(
  ({ onAdd, onSave }, ref) => {
    //#region Data
    const [index, setIndex] = useState(-1);

    const { control, reset, handleSubmit } = useForm<IAssetInSellAssetPayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
    });
    //#endregion

    //#region Event
    const onResetForm = () => {
      setIndex(-1);
      reset(DEFAULT_VALUES);
    };

    const onSubmit = () => {
      handleSubmit((values) => {
        if (index !== -1) {
          onSave(index, values);
        } else {
          onAdd(values);
        }
        onResetForm();
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      edit: (editIndex, editAsset) => {
        setIndex(editIndex);
        reset({ ...editAsset });
      },
    }));

    //#region Render
    return (
      <Paper variant="tool-card">
        <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Loại CCDC</CFormLabel>
              <CCategoryInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Tên CCDC</CFormLabel>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    placeholder="Tên công cụ dụng cụ"
                    {...field}
                    error={!!error}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Thuộc tính</CFormLabel>
              <CPropertyInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Giá bán</CFormLabel>
              <Controller
                control={control}
                name="gia_ban"
                render={({ field, fieldState: { error } }) => (
                  <CNumberInput {...field} suffix="VNĐ" error={!!error} />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Giá nhập</CFormLabel>
              <Controller
                control={control}
                name="gia_nhap"
                render={({ field, fieldState: { error } }) => (
                  <CNumberInput {...field} suffix="VNĐ" error={!!error} />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Số lượng</CFormLabel>
              <CQuantityItem control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Ngày bảo hành</CFormLabel>
              <Controller
                control={control}
                name="warranty_date"
                render={({ field, fieldState: { error } }) => (
                  <CDatepicker error={!!error} {...field} />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Bảo hành</CFormLabel>
              <Stack direction="row" gap={1}>
                <Controller
                  control={control}
                  name="warranty_duration"
                  render={({ field }) => <CNumberInput {...field} />}
                />
                <Controller
                  control={control}
                  name="warranty_level"
                  render={({ field }) => (
                    <CAutocomplete
                      options={WARRANTY_LEVELS_OPTIONS}
                      {...field}
                    />
                  )}
                />
              </Stack>
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Thành tiền</CFormLabel>
              <MTotalInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Mô tả</CFormLabel>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <CInput placeholder="Mô tả" {...field} />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={2}>
            <Stack direction="row" justifyContent="end" gap={1}>
              <CButton color="error" onClick={onResetForm}>
                Hủy
              </CButton>
              <CButton onClick={onSubmit}>
                {index !== -1 ? "Lưu" : "Thêm"}
              </CButton>
            </Stack>
          </Grid2>
        </Grid2>
      </Paper>
    );
    //#endregion
  }
);
