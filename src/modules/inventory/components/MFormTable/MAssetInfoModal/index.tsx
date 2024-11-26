import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { STOCKTAKE_QUALITIES_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CInput, CNumberInput } from "@controls";
import { IMoreAssetInformationInInventoryPayload } from "@interfaces/inventories";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { DEFAULT_VALUES, RESOLVER } from "./form";
import { IMAssetInfoModalProps, IMAssetInfoModalRef } from "./types";

export const MAssetInfoModal = forwardRef<
  IMAssetInfoModalRef,
  IMAssetInfoModalProps
>(({ data, update, index }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, reset, handleSubmit } =
    useForm<IMoreAssetInformationInInventoryPayload>({
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
      update(index, { ...data, ...values });
      onClose();
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  useEffect(() => {
    if (data && open) {
      reset({
        note: data.note,
        stocktake_quantity: data.stocktake_quantity,
        quality: data.quality,
        recommend: data.recommend,
      });
    }
  }, [data, open]);

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
            name="stocktake_quantity"
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
            render={({ field, fieldState: { error } }) => (
              <CAutocomplete
                options={STOCKTAKE_QUALITIES_OPTIONS}
                {...field}
                error={!!error}
              />
            )}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel>Kiến nghị xử lý</CFormLabel>
          <Controller
            control={control}
            name="recommend"
            render={({ field, fieldState: { error } }) => (
              <CInput {...field} error={!!error} />
            )}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel>Ghi chú</CFormLabel>
          <Controller
            control={control}
            name="note"
            render={({ field, fieldState: { error } }) => (
              <CInput {...field} error={!!error} />
            )}
          />
        </CFormInputWrapper>

        <Stack mt={2} direction="row" justifyContent="center" gap={1}>
          <CButton variant="contained" onClick={onClose}>
            Đóng
          </CButton>
          <CButton variant="contained" onClick={onSubmit}>
            Lưu
          </CButton>
        </Stack>
      </Stack>
    </Dialog>
  );
  //#endregion
});
