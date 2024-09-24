import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { storesApi } from "@apis/stores.api";
import { CButton, CInput, CPhoneInput } from "@controls";
import { toast } from "@funcs/toast";
import { IStorePayload } from "@interfaces/stores";
import { defaultValues } from "@modules/store/form";
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
      defaultValues: defaultValues,
    });
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setIsEdit(false);
      reset(defaultValues);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          const { id, ...payload } = values;
          if (isEdit) {
            await storesApi.update(id as string, payload);
            toast.success("Sửa chi nhánh thành công");
          } else {
            await storesApi.create(payload);
            toast.success("Thêm chi nhánh thành công");
          }
          refetch?.();
          onClose();
        } catch (error: any) {
          toast.error(error?.message ?? "Cập nhật chi nhánh không thành công");
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
            <CFormLabel required>Tên chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Mã chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Địa chỉ</CFormLabel>
            <Controller
              control={control}
              name="address"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Số điện thoại</CFormLabel>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => <CPhoneInput {...field} />}
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
            <CButton onClick={onSubmit}>Lưu thông tin</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
