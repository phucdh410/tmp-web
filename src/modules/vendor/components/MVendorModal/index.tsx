import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { vendorsApi } from "@apis/vendors.api";
import { CAutocomplete, CButton, CInput, CPhoneInput } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useGetAllCategories } from "@hooks/options";
import { IVendorPayload } from "@interfaces/vendors";
import { DEFAULT_VALUES, RESOLVER } from "@modules/vendor/forms";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMVendorModalProps, IMVendorModalRef } from "./types";

export const MVendorModal = forwardRef<IMVendorModalRef, IMVendorModalProps>(
  ({ refetch, getSucceededData }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { control, handleSubmit, reset, setValue } = useForm<IVendorPayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
      resolver: RESOLVER,
    });

    const { categories } = useGetAllCategories();
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
            const res = await vendorsApi.update(id!, payload);
            noti.success(MESSAGES("nhà cung cấp").SUCCESS.UPDATE);
            getSucceededData?.(res.data.data);
          } else {
            const res = await vendorsApi.create(payload);
            getSucceededData?.(res.data.data);
            noti.success(MESSAGES("nhà cung cấp").SUCCESS.CREATE);
          }
          refetch?.();
          onClose();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("nhà cung cấp").ERROR.SAVE);
        }
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (editData, initialName) => {
        if (editData) {
          setIsEdit(true);
          reset({
            ...editData,
            categories: editData?.categories?.map((e) => e.id),
          });
        }
        if (initialName) {
          setValue("name", initialName);
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose}>
        <Typography variant="dialog-title">{`${
          isEdit ? "Sửa" : "Thêm"
        } nhà cung cấp`}</Typography>
        <Stack minWidth={500} p={3} gap={2}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Tên NCC</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Phụ trách NCC</CFormLabel>
            <Controller
              control={control}
              name="contact"
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
            <CFormLabel required>
              Cung cấp loại
              <br />
              tài sản/CCDC
            </CFormLabel>
            <Controller
              control={control}
              name="categories"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  multiple
                  options={categories}
                  isDirtyOptions
                  {...field}
                  error={!!error}
                />
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
            <CFormLabel>Email</CFormLabel>
            <Controller
              control={control}
              name="email"
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
