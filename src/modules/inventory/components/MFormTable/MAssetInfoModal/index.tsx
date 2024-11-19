import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CButton, CInput, CNumberInput } from "@controls";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { DEFAULT_VALUES, RESOLVER } from "./form";
import { IMAssetInfoModalProps, IMAssetInfoModalRef } from "./types";

export interface IInformation {
  quantity: number;
  quality?: string;
  kien_nghi_xu_ly?: string;
  note?: string;
}

export const MAssetInfoModal = forwardRef<
  IMAssetInfoModalRef,
  IMAssetInfoModalProps
>((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, reset, handleSubmit } = useForm<IInformation>({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
    resolver: RESOLVER,
  });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    reset(DEFAULT_VALUES);
  };

  const onSubmit = () => {
    handleSubmit((values) => {
      console.log("🤣 values at line 40 🤣:", values);
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  return (
    <Dialog open={open} onClose={onClose}>
      <Typography variant="dialog-title">
        Thông tin bổ sung cho tài sản
      </Typography>
      <Stack minWidth={500} p={3} gap={2}>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel required>Số lượng kiểm kê</CFormLabel>
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState: { error } }) => (
              <CNumberInput {...field} error={!!error} />
            )}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel>Chất lượng</CFormLabel>
          <Controller
            control={control}
            name="quality"
            render={({ field }) => <CInput {...field} />}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel>Kiến nghị xử lý</CFormLabel>
          <Controller
            control={control}
            name="kien_nghi_xu_ly"
            render={({ field }) => <CInput {...field} />}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel>Ghi chú</CFormLabel>
          <Controller
            control={control}
            name="note"
            render={({ field }) => <CInput {...field} />}
          />
        </CFormInputWrapper>

        <Stack mt={2} direction="row" justifyContent="center" gap={1}>
          <CButton onClick={onClose}>Đóng</CButton>
          <CButton onClick={onSubmit}>Lưu</CButton>
        </Stack>
      </Stack>
    </Dialog>
  );
  //#endregion
});
