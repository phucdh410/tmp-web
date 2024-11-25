import { Controller } from "react-hook-form";

import { CDatepicker, CInput, CWarehouseInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MCustomerInput } from "./MCustomerInput";
import { MPaymentInput } from "./MPaymentInput";
import { MWarrantyInput } from "./MWarrantyInput";
import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  //#region Data
  //#endregion

  //#region Render
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số chứng từ
              <br />
              phiếu bán
            </CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput
                  {...field}
                  disabled={isEdit}
                  readOnly
                  placeholder="Số chứng từ do hệ thống tự tạo"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày lập chứng từ</CFormLabel>
            <Controller
              control={control}
              name="ngay_lap_chung_tu"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày giao hàng</CFormLabel>
            <Controller
              control={control}
              name="ngay_giao_hang"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Xuất từ kho</CFormLabel>
            <CWarehouseInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Khách hàng mua</CFormLabel>
            <MCustomerInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Địa chỉ giao hàng</CFormLabel>
            <Controller
              control={control}
              name="address"
              render={({ field, fieldState: { error } }) => (
                <CInput error={!!error} placeholder="Nhập địa chỉ" {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Hình thức thanh toán</CFormLabel>
            <MPaymentInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Dịch vụ bảo hành</CFormLabel>
            <MWarrantyInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Lý do</CFormLabel>
            <Controller
              control={control}
              name="reason"
              render={({ field, fieldState: { error } }) => (
                <CInput error={!!error} placeholder="Nhập lý do" {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Nội dung chứng từ</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  rows={4}
                  error={!!error}
                  placeholder="Nhập nội dung"
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
  //#endregion
};
