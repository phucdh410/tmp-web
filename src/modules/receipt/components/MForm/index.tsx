import { Controller } from "react-hook-form";

import {
  CAutocomplete,
  CCheckbox,
  CDatepicker,
  CInput,
  CNumberInput,
  CRadioButton,
} from "@controls";
import { Paper, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control }: IMFormProps) => {
  return (
    <Paper sx={{ boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.10)", my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số CT ghi tăng</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => <CInput {...field} readOnly />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày bảo hành</CFormLabel>
            <Controller
              control={control}
              name="ngay_bao_hanh"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn giá</CFormLabel>
            <Controller
              control={control}
              name="price"
              render={({ field }) => <CNumberInput {...field} suffix="VNĐ" />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Tên CCDC</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Loại CCDC</CFormLabel>
            <Controller
              control={control}
              name="loai_ccdc"
              render={({ field }) => (
                <CAutocomplete options={[]} creatable {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn vị tính</CFormLabel>
            <Stack direction="row" gap={1}>
              <Stack maxWidth="40%">
                <Controller
                  control={control}
                  name="unit"
                  render={({ field }) => <CInput {...field} />}
                />
              </Stack>
              <CFormInputWrapper percent={{ label: 50, input: 50 }}>
                <CFormLabel required>Số lượng</CFormLabel>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => <CNumberInput {...field} />}
                />
              </CFormInputWrapper>
            </Stack>
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="store_code"
              render={({ field }) => <CAutocomplete options={[]} {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Nhà cung cấp</CFormLabel>
            <Controller
              control={control}
              name="nha_cung_cap"
              render={({ field }) => (
                <CAutocomplete options={[]} creatable {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thành tiền</CFormLabel>
            <Controller
              control={control}
              name="amount"
              render={({ field }) => <CNumberInput {...field} suffix="VNĐ" />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Lý do ghi tăng</CFormLabel>
            <Controller
              control={control}
              name="reason"
              render={({ field }) => <CInput rows={3} {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Mô tả chi tiết</CFormLabel>
            <Controller
              control={control}
              name="description"
              render={({ field }) => <CInput rows={3} {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số kỳ phân bổ</CFormLabel>
            <Controller
              control={control}
              name="so_ky_phan_bo"
              render={({ field }) => <CNumberInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày bảo hành</CFormLabel>
            <Controller
              control={control}
              name="ngay_bao_hanh"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Bảo hành</CFormLabel>
            <Stack direction="row" gap={1}>
              <Controller
                control={control}
                name="bao_hanh_number"
                render={({ field }) => <CNumberInput {...field} />}
              />
              <Controller
                control={control}
                name="bao_hanh_level"
                render={({ field }) => (
                  <CAutocomplete options={[]} {...field} />
                )}
              />
            </Stack>
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số tiền phân bổ</CFormLabel>
            <Controller
              control={control}
              name="so_tien_phan_bo"
              render={({ field }) => <CNumberInput {...field} suffix="VNĐ" />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }} height="100%">
            <CFormLabel required>Loại code</CFormLabel>
            <Controller
              control={control}
              name="barcode"
              render={({ field }) => (
                <CRadioButton
                  options={[
                    { value: 0, label: "QR Code" },
                    { value: 1, label: "Barcode" },
                  ]}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thuộc tính</CFormLabel>
            <Controller
              control={control}
              name="thuoc_tinh"
              render={({ field }) => (
                <CAutocomplete multiple options={[]} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số hiệu</CFormLabel>
            <Controller
              control={control}
              name="so_hieu"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Tách riêng mã</CFormLabel>
            <Controller
              control={control}
              name="tach_rieng_ma"
              render={({ field }) => <CCheckbox {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
