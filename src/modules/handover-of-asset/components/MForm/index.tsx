import { Controller } from "react-hook-form";

import { CAutocomplete, CDatepicker, CInput, CUpload } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={2} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số phiếu đề xuất tài sản</CFormLabel>
            <Controller
              control={control}
              name="so_phieu_de_xuat_tai_san"
              render={({ field }) => (
                <CInput
                  {...field}
                  disabled={isEdit}
                  placeholder="Số phiếu đề xuất tài sản"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Tài sản bàn giao</CFormLabel>
            <Controller
              control={control}
              name="tai_san_ban_giao"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  disabled={isEdit}
                  placeholder="Tài sản bàn giao"
                  options={[]}
                  error={!!error}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số CT bàn giao</CFormLabel>
            <Controller
              control={control}
              name="so_ct_ban_giao"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  error={!!error}
                  placeholder="Số chứng từ bàn giao"
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Người nhận bàn giao</CFormLabel>
            <Controller
              control={control}
              name="nguoi_nhan_ban_giao"
              render={({ field }) => (
                <CAutocomplete
                  {...field}
                  options={[]}
                  disabled={isEdit}
                  placeholder="Người nhận bàn giao"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Lý do bàn giao</CFormLabel>
            <Controller
              control={control}
              name="reason"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  rows={4}
                  error={!!error}
                  placeholder="Nhập lý do bàn giao"
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Mô tả chi tiết</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  rows={4}
                  error={!!error}
                  placeholder="Nhập mô tả chi tiết"
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Upload file</CFormLabel>
            <Controller
              control={control}
              name="file"
              render={({ field, fieldState: { error } }) => <CUpload />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày bàn giao</CFormLabel>
            <Controller
              control={control}
              name="ngay_ban_giao"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
