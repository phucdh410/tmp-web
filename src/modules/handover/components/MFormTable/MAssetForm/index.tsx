import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CButton, CInput, CNumberInput } from "@controls";
import { IAssetInHandoverPayload } from "@interfaces/handovers";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MAssetInputs } from "./MAssetInputs";
import { ASSET_TYPE, IMAssetFormProps, IMAssetFormRef } from "./types";

const DEFAULT_VALUES: IAssetInHandoverPayload = {
  asset_id: -1,
  asset_code: "",
  asset_name: "",
  quantity: 1,
  description: "",
};

export const MAssetForm = forwardRef<IMAssetFormRef, IMAssetFormProps>(
  ({ onAdd, onSave }, ref) => {
    //#region Data
    const [index, setIndex] = useState(-1);
    const [type, setType] = useState<ASSET_TYPE>(ASSET_TYPE.NEW);

    const { control, reset, handleSubmit, setValue } =
      useForm<IAssetInHandoverPayload>({
        mode: "all",
        defaultValues: DEFAULT_VALUES,
      });
    //#endregion

    //#region Event
    const onResetForm = () => {
      setIndex(-1);
      setType(ASSET_TYPE.NEW);
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

    const onTypeChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
      if (value !== null) {
        setType(value);
        setValue("asset_code", "");
        setValue("asset_id", undefined);
        setValue("asset_name", "");
      }
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      edit: (editIndex, editAsset) => {
        setIndex(editIndex);
        if (editAsset.asset_id) setType(ASSET_TYPE.EXIST);
        reset({ ...editAsset });
      },
    }));

    //#region Render
    return (
      <Paper variant="tool-card">
        <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
          <MAssetInputs
            control={control}
            setValue={setValue}
            type={type}
            onTypeChange={onTypeChange}
          />
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
