import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { positionsApi } from "@apis/positions.api";
import { roomsApi } from "@apis/rooms.api";
import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CDatepicker, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { IRoomPayload } from "@interfaces/rooms";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { defaultValues, resolver } from "../../form";

import { IMModalProps, IMModalRef } from "./types";

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ stores, room_groups_options, refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
    } = useForm<IRoomPayload>({
      mode: "all",
      defaultValues,
      resolver,
    });

    const { data: positions_options } = useQuery({
      queryKey: ["danh-sach-vi-tri"],
      queryFn: () => positionsApi.getAll(),
      select: (response) =>
        response?.data?.data?.map((e) => ({ id: Number(e.id), label: e.name })),
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

    useEffect(() => {
      if (stores?.length > 0 && open && !isEdit)
        setValue("store_code", stores[0].id as string);
    }, [stores, isEdit, open]);

    useEffect(() => {
      if (room_groups_options?.length > 0 && open && !isEdit)
        setValue("room_group_id", room_groups_options[0].id as number);
    }, [room_groups_options, isEdit, open]);

    useEffect(() => {
      if (positions_options && positions_options?.length > 0 && open && !isEdit)
        setValue("place_position_id", positions_options[0].id);
    }, [positions_options, isEdit, open]);

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
            place_position_id: Number(editData?.place_position_id),
            room_group_id: Number(editData?.room_group_id),
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
        } phòng`}</Typography>
        <Grid2 container m={2} columns={2} spacing={3}>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
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
          </Grid2>
          <Grid2 xs={1}>
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
          <Grid2 xs={1}>
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
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Nhóm phòng</CFormLabel>
              <Controller
                control={control}
                name="room_group_id"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    options={room_groups_options ?? []}
                    error={!!error}
                    errorText={error?.message}
                  />
                )}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 xs={1}>
            <CFormInputWrapper percent={{ label: 45, input: 55 }}>
              <CFormLabel required>Vị trí</CFormLabel>
              <Controller
                control={control}
                name="place_position_id"
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    options={positions_options ?? []}
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
          <Grid2 xs={1}>
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
      </Dialog>
    );
    //#endregion
  }
);
