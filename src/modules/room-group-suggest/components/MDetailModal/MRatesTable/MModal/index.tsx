import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { DAYS_OF_WEEK_OPTIONS, TIMES_IN_DAY_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CDatepicker, CNumberInput } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";
import { Box, Dialog, Grid2, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMModalProps, IMModalRef } from "./types";

const defaultValues: IRateInRoomGroupPayload = {
  id: undefined,
  room_group_id: undefined,
  day_of_week: 1,
  start_time: 12,
  end_time: 12,
  apply_from: new Date(),
  price: 0,
  holiday_price: 0,
};

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { control, handleSubmit, reset } = useForm<IRateInRoomGroupPayload>({
      mode: "all",
      defaultValues,
    });
    //#endregion

    //#region Event
    const onClose = () => {
      setIsEdit(false);
      reset(defaultValues);
      setOpen(false);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          const { id, ...payload } = values;

          if (isEdit) {
            await roomGroupSuggestApi.updateRateInRoomGroup(id!, payload);
          } else {
            await roomGroupSuggestApi.addRateToRoomGroup(payload);
          }
          noti.success(MESSAGES("đề xuất nhóm phòng").SUCCESS.SAVE);
          refetch();
          onClose();
        } catch (error: any) {
          noti.error(
            error?.message ?? MESSAGES("đề xuất nhóm phòng").ERROR.SAVE
          );
        }
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (room_group_id, rateData) => {
        if (rateData) {
          setIsEdit(true);
        }
        reset({
          id: rateData?.id ?? defaultValues.id,
          day_of_week: rateData?.day_of_week ?? defaultValues.day_of_week,
          apply_from: rateData?.apply_from ?? defaultValues.apply_from,
          start_time: rateData?.start_time ?? defaultValues.start_time,
          end_time: rateData?.end_time ?? defaultValues.end_time,
          price: rateData?.price ?? defaultValues.price,
          holiday_price: rateData?.holiday_price ?? defaultValues.holiday_price,
          room_group_id: room_group_id ?? defaultValues.room_group_id,
        });

        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <Typography variant="dialog-title">
          {isEdit ? "sửa" : "thêm"} thời gian và giá
        </Typography>
        <Stack p={2} gap={3}>
          <Grid2 container columns={2} spacing={2}>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel required>Thứ</CFormLabel>
                <Controller
                  control={control}
                  name="day_of_week"
                  render={({ field }) => (
                    <CAutocomplete {...field} options={DAYS_OF_WEEK_OPTIONS} />
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
                  render={({ field }) => <CDatepicker {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel required>Từ</CFormLabel>
                <Controller
                  control={control}
                  name="start_time"
                  render={({ field }) => (
                    <CAutocomplete {...field} options={TIMES_IN_DAY_OPTIONS} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel required>Đến</CFormLabel>
                <Controller
                  control={control}
                  name="end_time"
                  render={({ field }) => (
                    <CAutocomplete {...field} options={TIMES_IN_DAY_OPTIONS} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel required>Giá ngày thường</CFormLabel>
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => <CNumberInput {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel required>Giá ngày lễ</CFormLabel>
                <Controller
                  control={control}
                  name="holiday_price"
                  render={({ field }) => <CNumberInput {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
          </Grid2>
          <Box textAlign="center">
            <CButton onClick={onSubmit} highlight>
              Lưu thông tin
            </CButton>
          </Box>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
