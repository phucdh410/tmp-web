import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { placesApi } from "@apis/places.api";
import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { IPlacePayload } from "@interfaces/places";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";

import { defaultValues, resolver } from "../../form";

import { IMModalProps, IMModalRef } from "./types";

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ STORES_OPTIONS, refetch, ...props }, ref) => {
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
            refetch();
            onClose();
          } else {
            await placesApi.create(payload);
            toast.success("Thêm khu vực thành công!");
            refetch();
            onClose();
          }
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra!");
        }
      })();
    };
    //#endregion

    useEffect(() => {
      if (STORES_OPTIONS?.length > 0 && open && !isEdit)
        setValue("store_code", STORES_OPTIONS[0].id as string);
    }, [STORES_OPTIONS, isEdit, open]);

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
        <Grid2 container m={2} columns={2} spacing={3}>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Mã khu vực</CFormLabel>
              <Controller
                control={control}
                name="code"
                render={({ field }) => <CInput {...field} disabled />}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Tên khu vực</CFormLabel>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Chi nhánh/Phòng ban</CFormLabel>
              <Controller
                control={control}
                name="store_code"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    options={STORES_OPTIONS ?? []}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
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
          </Grid2>
        </Grid2>

        <Stack my={2} alignItems="center" justifyContent="center">
          <CButton onClick={onSubmit} loading={isSubmitting}>
            Lưu thông tin
          </CButton>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
