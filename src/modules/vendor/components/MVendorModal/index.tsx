import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { vendorsApi } from "@apis/vendors.api";
import { CAutocomplete, CButton, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { useGetAllCategories } from "@hooks/options";
import { IVendorPayload } from "@interfaces/vendors";
import { defaultValues } from "@modules/vendor/form";
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
      defaultValues: defaultValues,
    });

    const { categories } = useGetAllCategories();
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
            const res = await vendorsApi.update(id as string, payload);
            toast.success("Sửa nhà cung cấp thành công");
            getSucceededData?.(res.data.data);
          } else {
            const res = await vendorsApi.create(payload);
            getSucceededData?.(res.data.data);
            toast.success("Thêm nhà cung cấp thành công");
          }
          refetch?.();
          onClose();
        } catch (error: any) {
          toast.error(
            error?.message ?? "Cập nhật nhà cung cấp không thành công"
          );
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
            categories: editData?.categories?.map((e) => Number(e.id)),
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
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Phụ trách NCC</CFormLabel>
            <Controller
              control={control}
              name="contact"
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
            <CFormLabel required>
              Cung cấp loại
              <br />
              tài sản/CCDC
            </CFormLabel>
            <Controller
              control={control}
              name="categories"
              render={({ field }) => (
                <CAutocomplete multiple options={categories} {...field} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Số điện thoại</CFormLabel>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => <CInput {...field} />}
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
            <CButton onClick={onSubmit}>Lưu thông tin</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
