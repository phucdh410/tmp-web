import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { amenitiesApi } from "@apis/amenities.api";
import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CInput, CNumberInput } from "@controls";
import { toast } from "@funcs/toast";
import { IAmenityPayload } from "@interfaces/amenities";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CFormLabel } from "@others";

import { defaultValues, resolver } from "../../form";

import { IMModalProps, IMModalRef } from "./types";

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ TIEU_CHI_OPTIONS, refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      getValues,
      formState: { isSubmitting },
    } = useForm<IAmenityPayload>({
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
            await amenitiesApi.update(id!, payload);
            toast.success("Sửa tiêu chí tiện ích phòng thành công!");
            refetch();
            onClose();
          } else {
            await amenitiesApi.create(payload);
            toast.success("Thêm tiêu chí tiện ích phòng thành công!");
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
      if (TIEU_CHI_OPTIONS?.length > 0 && open && !isEdit)
        setValue("amenity_criteria_code", TIEU_CHI_OPTIONS[0].id as string);
    }, [TIEU_CHI_OPTIONS, isEdit, open]);

    useImperativeHandle(ref, () => ({
      open: (editData) => {
        if (editData) {
          setIsEdit(true);

          reset({
            id: editData?.id,
            code: editData?.code,
            name: editData?.name,
            amenity_criteria_code: editData?.amenity_criteria_code,
            price: editData?.price,
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
        } tiêu chí đánh giá tiện ích`}</Typography>
        <button onClick={() => console.log(getValues())}>Log values</button>
        <Grid2 container m={2} columns={2} spacing={3}>
          <Grid2 xs={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                label: {
                  flexBasis: "40%",
                },
                "> div": {
                  flexBasis: "60%",
                },
              }}
            >
              <CFormLabel required>Mã tiện ích</CFormLabel>
              <Controller
                control={control}
                name="code"
                render={({ field }) => <CInput {...field} disabled />}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                label: {
                  flexBasis: "40%",
                },
                "> div": {
                  flexBasis: "60%",
                },
              }}
            >
              <CFormLabel required>Tên tiện ích</CFormLabel>
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
            </Stack>
          </Grid2>
          <Grid2 xs={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                label: {
                  flexBasis: "40%",
                },
                "> div": {
                  flexBasis: "60%",
                },
              }}
            >
              <CFormLabel required>Tiêu chí tiện ích</CFormLabel>
              <Controller
                control={control}
                name="amenity_criteria_code"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    options={TIEU_CHI_OPTIONS ?? []}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                label: {
                  flexBasis: "40%",
                },
                "> div": {
                  flexBasis: "60%",
                },
              }}
            >
              <CFormLabel required>Giá tiện ích</CFormLabel>
              <Controller
                control={control}
                name="price"
                render={({ field, fieldState: { error } }) => (
                  <CNumberInput
                    {...field}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                label: {
                  flexBasis: "40%",
                },
                "> div": {
                  flexBasis: "60%",
                },
              }}
            >
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
            </Stack>
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
