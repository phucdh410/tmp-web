import { Controller } from "react-hook-form";

import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
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
            <CFormLabel required>Hình thức ghi giảm</CFormLabel>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CAutocomplete
                  {...field}
                  options={[]}
                  disabled={isEdit}
                  placeholder="Chọn hình thức"
                />
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
            <CFormLabel required>Ngày ghi giảm</CFormLabel>
            <Controller
              control={control}
              name="issue_date"
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
            <CFormLabel required>Lý do ghi giảm</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <CInput placeholder="Lý do ghi giảm" rows={3} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
