import { forwardRef, useImperativeHandle, useState } from "react";

import { CAutocomplete, CButton, CDatepicker } from "@controls";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFilterModalProps, IMFilterModalRef } from "./types";

export const MFilterModal = forwardRef<IMFilterModalRef, IMFilterModalProps>(
  (props, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);
    //#endregion

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Stack p={3}>
          <Grid2 container columns={3} spacing={2}>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Thời gian</CFormLabel>
                <Stack direction="row" gap={1}>
                  <CDatepicker
                    format="MM/YYYY"
                    views={["month", "year"]}
                    hidePickerIcon
                  />
                  <CDatepicker
                    format="MM/YYYY"
                    views={["month", "year"]}
                    hidePickerIcon
                  />
                </Stack>
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Chi nhánh</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Khu vực</CFormLabel>
                <CAutocomplete options={[]} optionAll />
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
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Ngày ghi tăng</CFormLabel>
                <CDatepicker />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Đơn giá</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Loại CCDC</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Lý do</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Thành tiền</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Đơn vị tính</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 40, input: 60 }}>
                <CFormLabel>Số lượng tăng</CFormLabel>
                <CAutocomplete options={[]} optionAll />
              </CFormInputWrapper>
            </Grid2>
          </Grid2>

          <Stack mt={3} flexDirection="row" justifyContent="center">
            <CButton>Tìm kiếm</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
