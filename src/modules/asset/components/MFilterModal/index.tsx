import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CODE_TYPES_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CButton,
  CDatepicker,
  CInput,
  CNumberInput,
} from "@controls";
import { IParams } from "@modules/receipt/types";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFilterModalProps, IMFilterModalRef } from "./types";

export const MFilterModal = forwardRef<IMFilterModalRef, IMFilterModalProps>(
  (props, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useForm<IParams>({ mode: "all" });
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onSubmit = () => {
      handleSubmit(async (values) => {
        console.log(values);
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (currentParams) => {
        reset({ ...currentParams });
        setOpen(true);
      },
    }));

    //#region Rendervvvv
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Stack p={3}>
          <Grid2 container columns={3} spacing={2}>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Thời gian</CFormLabel>
                <Stack direction="row" gap={1}>
                  <Controller
                    control={control}
                    name="start_at"
                    render={({ field }) => (
                      <CDatepicker
                        format="MM/YYYY"
                        views={["month", "year"]}
                        hidePickerIcon
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="end_at"
                    render={({ field }) => (
                      <CDatepicker
                        format="MM/YYYY"
                        views={["month", "year"]}
                        hidePickerIcon
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Chi nhánh</CFormLabel>
                <Controller
                  control={control}
                  name="store_code"
                  render={({ field }) => (
                    <CAutocomplete options={[]} optionAll {...field} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Khu vực</CFormLabel>
                <Controller
                  control={control}
                  name="place_id"
                  render={({ field }) => (
                    <CAutocomplete options={[]} optionAll {...field} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={3}>
              <Typography
                textTransform="uppercase"
                fontWeight={600}
                fontSize={20}
              >
                đơn vị trong bảng
              </Typography>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Số chứng từ</CFormLabel>
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <CInput {...field} placeholder="Nhập số chứng từ" />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Ngày ghi tăng</CFormLabel>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => <CDatepicker {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Đơn giá</CFormLabel>
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => <CNumberInput {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Loại CCDC</CFormLabel>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field }) => (
                    <CAutocomplete options={[]} optionAll {...field} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Lý do</CFormLabel>
                <Controller
                  control={control}
                  name="reason"
                  render={({ field }) => (
                    <CInput {...field} placeholder="Nhập lý do" />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Thành tiền</CFormLabel>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => <CNumberInput {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Đơn vị tính</CFormLabel>
                <Controller
                  control={control}
                  name="unit"
                  render={({ field }) => (
                    <CAutocomplete options={[]} optionAll {...field} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Số lượng tăng</CFormLabel>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => <CNumberInput {...field} />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Code</CFormLabel>
                <Controller
                  control={control}
                  name="barcode"
                  render={({ field }) => (
                    <CAutocomplete
                      options={CODE_TYPES_OPTIONS}
                      optionAll
                      {...field}
                    />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
          </Grid2>

          <Stack mt={3} flexDirection="row" justifyContent="center">
            <CButton onClick={onSubmit}>Tìm kiếm</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
