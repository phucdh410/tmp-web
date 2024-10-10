import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { roomsApi } from "@apis/rooms.api";
import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CDatepicker, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { IRoomPayload } from "@interfaces/rooms";
import { Dialog, Grid2, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import dayjs from "dayjs";

import { defaultValues, resolver } from "../../form";

import { MRegionInput } from "./MRegionInput";
import { MRoomGroupInput } from "./MRoomGroupInput";
import { MStoreInput } from "./MStoreInput";
import { IMModalProps, IMModalRef } from "./types";

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ refetch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      formState: { isSubmitting },
    } = useForm<IRoomPayload>({
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
          const { id, ...payload } = values;
          if (isEdit) {
            await roomsApi.update(id!, payload);
            toast.success("Sửa phòng thành công!");
            refetch();
            onClose();
          } else {
            await roomsApi.create(payload);
            toast.success("Thêm phòng thành công!");
            refetch();
            onClose();
          }
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra!");
        }
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (editData) => {
        if (editData) {
          setIsEdit(true);

          reset({
            id: editData?.id,
            code: editData?.code,
            name: editData?.name,
            store_code: editData?.store_code,
            apply_from: dayjs(editData?.apply_from).toString(),
            region_id: Number(editData?.region_id),
            room_group_id: Number(editData?.room_group_id),
            status: editData?.status,
          });
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      (<Dialog open={open} onClose={onClose} maxWidth="md">
        <Typography variant="dialog-title">{`${
          isEdit ? "sửa" : "thêm"
        } phòng`}</Typography>
        <Grid2 container m={2} columns={2} spacing={3}>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Chi nhánh</CFormLabel>
              <MStoreInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Mã phòng</CFormLabel>
              <Controller
                control={control}
                name="code"
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
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Tên phòng</CFormLabel>
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
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Nhóm phòng</CFormLabel>
              <MRoomGroupInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Vị trí</CFormLabel>
              <MRegionInput control={control} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
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
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Áp dụng từ ngày</CFormLabel>
              <Controller
                control={control}
                name="apply_from"
                render={({ field, fieldState: { error } }) => (
                  <CDatepicker
                    {...field}
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
      </Dialog>)
    );
    //#endregion
  }
);
