import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  CButton,
  CCategoryInput,
  CInput,
  CNumberInput,
  CQuantityItem,
} from "@controls";
import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MCodeInput } from "./MCodeInput";
import { MNameInput } from "./MNameInput";
import { MTotalInput } from "./MTotalInput";
import { IMAssetFormProps, IMAssetFormRef } from "./types";

const DEFAULT_VALUES: IAssetInPaymentProposalPayload = {
  name: "",
  category_id: -1,
  price: 0,
  code: "",
  unit: "",
  quantity: 1,
  total: 0,
  description: "",
};

export const MAssetForm = forwardRef<IMAssetFormRef, IMAssetFormProps>(
  ({ onAdd, onSave }, ref) => {
    //#region Data
    const [index, setIndex] = useState(-1);

    const { control, reset, handleSubmit } =
      useForm<IAssetInPaymentProposalPayload>({
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
              <CFormLabel>Mã TS(nếu có)</CFormLabel>
              <MCodeInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Tên CCDC</CFormLabel>
              <MNameInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Loại CCDC</CFormLabel>
              <CCategoryInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Đơn giá</CFormLabel>
              <Controller
                control={control}
                name="price"
                render={({ field, fieldState: { error } }) => (
                  <CNumberInput
                    {...field}
                    suffix="VNĐ"
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
              <CQuantityItem control={control} />
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
