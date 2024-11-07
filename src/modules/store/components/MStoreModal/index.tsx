import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { storesApi } from "@apis/stores.api";
import { CButton, CInput, CPhoneInput } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { IStorePayload } from "@interfaces/stores";
import { DEFAULT_VALUES, RESOLVER } from "@modules/store/form";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMStoreModalProps, IMStoreModalRef } from "./types";

export const MStoreModal = forwardRef<IMStoreModalRef, IMStoreModalProps>(
  ({ refetch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { control, handleSubmit, reset } = useForm<IStorePayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
      resolver: RESOLVER,
    });
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setIsEdit(false);
      reset(DEFAULT_VALUES);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          const { id, ...payload } = values;
          if (isEdit) {
            await storesApi.update(id as string, payload);
            noti.success(MESSAGES("chi nhánh").SUCCESS.UPDATE);
          } else {
            await storesApi.create(payload);
            noti.success(MESSAGES("chi nhánh").SUCCESS.CREATE);
          }
          refetch?.();
          onClose();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("chi nhánh").ERROR.SAVE);
        }
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (editData) => {
        if (editData) {
          setIsEdit(true);
          reset({ ...editData });
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose}>
        <Typography variant="dialog-title">{`${
          isEdit ? "Sửa" : "Thêm"
        } chi nhánh`}</Typography>
        <Stack minWidth={500} p={3} gap={2}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required htmlFor="name">
              Tên chi nhánh
            </CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Mã chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Địa chỉ</CFormLabel>
            <Controller
              control={control}
              name="address"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Số điện thoại</CFormLabel>
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <CPhoneInput {...field} error={!!error} />
              )}
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

          <Stack mt={2} direction="row" justifyContent="center">
            <CButton onClick={onSubmit} highlight>
              Lưu thông tin
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
