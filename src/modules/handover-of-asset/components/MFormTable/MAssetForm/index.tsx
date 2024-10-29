import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  CAutocomplete,
  CButton,
  CInput,
  CNumberInput,
  CUpload,
} from "@controls";
import { IAssetInHandoverPayload } from "@interfaces/handover-of-assets";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMAssetFormProps, IMAssetFormRef } from "./types";

const DEFAULT_VALUES: IAssetInHandoverPayload = {
  asset_code: "",
  nguoi_ban_giao: "",
  nguoi_nhan_ban_giao: "",
  quantity: 1,
  reason: "",
  description: "",
  file_id: "",
};

export const MAssetForm = forwardRef<IMAssetFormRef, IMAssetFormProps>(
  ({ onAdd, onSave }, ref) => {
    //#region Data
    const [index, setIndex] = useState(-1);

    const { control, reset, handleSubmit } = useForm<IAssetInHandoverPayload>({
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
              <CFormLabel required>Tài sản bàn giao</CFormLabel>
              <Controller
                control={control}
                name="asset_code"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    placeholder="Chọn tài sản bàn giao"
                    options={[]}
                    {...field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Người bàn giao</CFormLabel>
              <Controller
                control={control}
                name="nguoi_ban_giao"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    placeholder="Chọn người bàn giao"
                    options={[]}
                    {...field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>
                Người nhận
                <br />
                bàn giao
              </CFormLabel>
              <Controller
                control={control}
                name="nguoi_nhan_ban_giao"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    placeholder="Chọn người nhận bàn giao"
                    options={[]}
                    {...field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Số lượng</CFormLabel>
              <Controller
                control={control}
                name="quantity"
                render={({ field, fieldState: { error } }) => (
                  <CNumberInput
                    min={1}
                    {...field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Lý do bàn giao</CFormLabel>
              <Controller
                control={control}
                name="reason"
                render={({ field }) => (
                  <CInput placeholder="Nhập lý do" {...field} />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Mô tả</CFormLabel>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <CInput placeholder="Nhập mô tả" {...field} />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Upload file</CFormLabel>
              <Controller
                control={control}
                name="file_id"
                render={({ field }) => <CUpload {...field} />}
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
