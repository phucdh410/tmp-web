import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { placesApi } from "@apis/places.api";
import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { IPlacePayload } from "@interfaces/places";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { defaultValues, resolver } from "../../form";

import { IMModalProps, IMModalRef } from "./types";

export const MPlaceModal = forwardRef<IMModalRef, IMModalProps>(
  ({ stores, refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
    } = useForm<IPlacePayload>({
      mode: "all",
      defaultValues,
      resolver,
    });
    //#endregion

    //#region Event
    const onClose = () => {
      reset(defaultValues);
      setIsEdit(false);
      setOpen(false);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          const { code, id, ...payload } = values;
          if (isEdit) {
            await placesApi.update(id!, payload);
            toast.success("Sửa khu vực thành công!");
          } else {
            await placesApi.create(payload);
            toast.success("Thêm khu vực thành công!");
          }
          refetch();
          onClose();
        } catch (error: any) {
          toast.error(error?.message ?? "Cập nhật khu vực không thành công");
        }
      })();
    };
    //#endregion

    useEffect(() => {
      if (stores?.length > 0 && open && !isEdit)
        setValue("store_code", stores[0].id as string);
    }, [stores, isEdit, open]);

    useImperativeHandle(ref, () => ({
      open: (editData) => {
        if (editData) {
          setIsEdit(true);
          reset({
            id: editData?.id,
            code: editData?.code,
            name: editData?.name,
            store_code: editData?.store_code,
            status: editData?.status,
          });
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <Typography variant="dialog-title">{`${
          isEdit ? "sửa" : "thêm"
        } khu vực`}</Typography>
        <Stack minWidth={500} p={3} gap={2}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Mã khu vực</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => <CInput readOnly {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Tên khu vực</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} errorText={error?.message} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="store_code"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={stores}
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Trạng thái</CFormLabel>
            <Controller
              control={control}
              name="status"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={STATUS_OPTIONS}
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>

          <Stack mt={2} direction="row" justifyContent="center">
            <CButton onClick={onSubmit} loading={isSubmitting} highlight>
              Lưu thông tin
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
