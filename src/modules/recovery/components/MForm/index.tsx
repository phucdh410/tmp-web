import { Controller } from "react-hook-form";

import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  return (
    <Paper sx={{ boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.10)", my: 3 }}>
      <Grid2 p={3} container columns={2} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số chứng từ</CFormLabel>
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
            <CFormLabel required>Vị trí tài sản</CFormLabel>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <CInput {...field} placeholder="Vị trí tài sản" />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày chứng từ</CFormLabel>
            <Controller
              control={control}
              name="created_date"
              render={({ field }) => (
                <CDatepicker {...field} disabled={isEdit} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày thu hồi</CFormLabel>
            <Controller
              control={control}
              name="recovery_date"
              render={({ field }) => (
                <CDatepicker {...field} disabled={isEdit} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="store_code"
              render={({ field }) => (
                <CAutocomplete
                  placeholder="Chọn chi nhánh"
                  options={[]}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>NV phụ trách tài sản</CFormLabel>
            <Controller
              control={control}
              name="user_id"
              render={({ field }) => (
                <CAutocomplete
                  placeholder="Chọn nhân viên"
                  options={[]}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Lý do thu hồi</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <CInput placeholder="Lý do thu hồi" rows={3} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
