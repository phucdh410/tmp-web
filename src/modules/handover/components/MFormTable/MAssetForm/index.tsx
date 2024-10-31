import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete, CButton, CInput, CNumberInput } from "@controls";
import { IAssetInHandoverPayload } from "@interfaces/handovers";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMAssetFormProps, IMAssetFormRef } from "./types";

const DEFAULT_VALUES: IAssetInHandoverPayload = {
  asset_id: -1,
  asset_code: "",
  asset_name: "",
  quantity: 1,
  reason: "",
  description: "",
};

export const MAssetForm = forwardRef<IMAssetFormRef, IMAssetFormProps>(
  ({ onAdd, onSave }, ref) => {
    //#region Data
    const [index, setIndex] = useState(-1);

    const { control, reset, handleSubmit, setValue } =
      useForm<IAssetInHandoverPayload>({
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

    const onSelectAsset =
      (onChangeCallback: (...event: any[]) => void) =>
      (
        value: any,
        event?: React.SyntheticEvent<Element, Event>,
        selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null
      ) => {
        onChangeCallback(value);
        setValue("asset_code", (selectedOption as IAutocompleteOption)?.code);
        setValue("asset_name", (selectedOption as IAutocompleteOption)?.label);
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
                name="asset_id"
                render={({
                  field: { onChange, ..._field },
                  fieldState: { error },
                }) => (
                  <CAutocomplete
                    placeholder="Chọn tài sản bàn giao"
                    options={[]}
                    onChange={onSelectAsset(onChange)}
                    {..._field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Mã tài sản</CFormLabel>
              <Controller
                control={control}
                name="asset_id"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    placeholder="Chọn tài sản bàn giao"
                    options={[]}
                    display="code"
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
