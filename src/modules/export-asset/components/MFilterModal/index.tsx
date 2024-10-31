import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import {
  CAutocomplete,
  CButton,
  CDatepicker,
  CInput,
  CNumberInput,
} from "@controls";
import {
  useGetAllRegions,
  useGetAllStores,
  useGetAllUnits,
} from "@hooks/options";
import { IParams } from "@modules/receipt/types";
import { Dialog, Grid2, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFilterModalProps, IMFilterModalRef } from "./types";

export const MFilterModal = forwardRef<IMFilterModalRef, IMFilterModalProps>(
  ({ onSearch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useForm<IParams>({ mode: "all" });

    const { units } = useGetAllUnits();

    const { stores } = useGetAllStores();
    const store_code = useWatch({ control, name: "store_code" });
    const { regions } = useGetAllRegions(
      store_code ? { store_code } : undefined
    );
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onSubmit = () => {
      handleSubmit(async (values) => {
        onSearch(values);
        onClose();
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
      (<Dialog open={open} onClose={onClose} maxWidth="lg">
        <Stack p={3}>
          <Grid2 container columns={3} spacing={2}>
            <Grid2 size={1}>
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
                        disabled
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
                        disabled
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Chi nhánh</CFormLabel>
                <Controller
                  control={control}
                  name="store_code"
                  render={({ field }) => (
                    <CAutocomplete options={stores} optionAll {...field} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Vị trí phân bổ</CFormLabel>
                <Controller
                  control={control}
                  name="region_id"
                  render={({ field }) => (
                    <CAutocomplete options={regions} optionAll {...field} />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={3}>
              <Typography
                textTransform="uppercase"
                fontWeight={600}
                fontSize={20}
              >
                đơn vị trong bảng
              </Typography>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Số chứng từ</CFormLabel>
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      placeholder="Nhập số chứng từ"
                      disabled
                    />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Ngày ghi tăng</CFormLabel>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => <CDatepicker {...field} disabled />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Đơn giá</CFormLabel>
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => <CNumberInput {...field} disabled />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Loại CCDC</CFormLabel>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field }) => (
                    <CAutocomplete options={[]} optionAll {...field} disabled />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Lý do</CFormLabel>
                <Controller
                  control={control}
                  name="reason"
                  render={({ field }) => (
                    <CInput {...field} placeholder="Nhập lý do" disabled />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Thành tiền</CFormLabel>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => <CNumberInput {...field} disabled />}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Đơn vị tính</CFormLabel>
                <Controller
                  control={control}
                  name="unit"
                  render={({ field }) => (
                    <CAutocomplete
                      options={units}
                      optionAll
                      {...field}
                      disabled
                    />
                  )}
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 size={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Số lượng tăng</CFormLabel>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => <CNumberInput {...field} disabled />}
                />
              </CFormInputWrapper>
            </Grid2>
          </Grid2>

          <Stack mt={3} flexDirection="row" justifyContent="center">
            <CButton onClick={onSubmit}>Tìm kiếm</CButton>
          </Stack>
        </Stack>
      </Dialog>)
    );
    //#endregion
  }
);
