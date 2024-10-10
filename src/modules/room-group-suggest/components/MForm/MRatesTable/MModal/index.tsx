import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { DAYS_OF_WEEK_OPTIONS, TIMES_IN_DAY_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CDatepicker, CNumberInput } from "@controls";
import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";
import { Box, Dialog, Grid2, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMModalProps, IMModalRef } from "./types";

const defaultValues: IRateInRoomGroupPayload = {
  day_of_week: 1,
  start_time: 12,
  end_time: 12,
  apply_from: new Date(),
  price: 0,
  holiday_price: 0,
};

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ onCreate, onUpdate, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    const { control, handleSubmit, reset } = useForm<IRateInRoomGroupPayload>({
      mode: "all",
      defaultValues,
    });
    //#endregion

    //#region Event
    const onClose = () => {
      setEditIndex(-1);
      reset();
      setOpen(false);
    };

    const onSubmit = () => {
      handleSubmit((values) => {
        if (editIndex !== -1) {
          onUpdate(values, editIndex);
          onClose();
        } else {
          onCreate(values);
          onClose();
        }
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (rateData, index = -1) => {
        if (rateData && index !== -1) {
          setEditIndex(index);
          reset({
            day_of_week: rateData?.day_of_week ?? defaultValues.day_of_week,
            apply_from: rateData?.apply_from ?? defaultValues.apply_from,
            start_time: rateData?.start_time ?? defaultValues.start_time,
            end_time: rateData?.end_time ?? defaultValues.end_time,
            price: rateData?.price ?? defaultValues.price,
            holiday_price:
              rateData?.holiday_price ?? defaultValues.holiday_price,
          });
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      (<Dialog open={open} onClose={onClose} maxWidth="md">
        <Typography variant="dialog-title">
          {editIndex !== -1 ? "sửa" : "thêm"} thời gian và giá
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
      </Dialog>)
    );
    //#endregion
  }
);
