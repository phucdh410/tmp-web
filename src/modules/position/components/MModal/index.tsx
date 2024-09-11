import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { positionsApi } from "@apis/positions.api";
import { CAutocomplete, CButton, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { IPositionPayload } from "@interfaces/positions";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";

import { defaultValues, resolver } from "../../form";

import { IMModalProps, IMModalRef } from "./types";

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ stores, PLACES_OPTIONS, refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
    } = useForm<IPositionPayload>({
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
            await positionsApi.update(id!, payload);
            toast.success("Sửa vị trí thành công!");
            refetch();
            onClose();
          } else {
            await positionsApi.create(payload);
            toast.success("Thêm vị trí thành công!");
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
            place_code: editData?.place_code,
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
        } vị trí`}</Typography>
        <Grid2 container m={2} columns={2} spacing={3}>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Mã vị trí</CFormLabel>
              <Controller
                control={control}
                name="code"
                render={({ field }) => <CInput {...field} disabled />}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Tên vị trí</CFormLabel>
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
                    options={stores}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Khu vực</CFormLabel>
              <Controller
                control={control}
                name="place_code"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    options={PLACES_OPTIONS ?? []}
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
