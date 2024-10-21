import { Controller } from "react-hook-form";

import { CAutocomplete, CButton, CDatepicker, CInput } from "@controls";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false, onSubmit }: IMFormProps) => {
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
            <CFormLabel required>Ngày khấu hao</CFormLabel>
            <Controller
              control={control}
              name="deprecate_date"
              render={({ field }) => (
                <CDatepicker {...field} disabled={isEdit} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Diễn giải</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <CInput placeholder="Diễn giải" {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thời gian</CFormLabel>
            <Stack direction="row" alignItems="center" gap={1}>
              <Controller
                control={control}
                name="time"
                render={({ field }) => (
                  <CDatepicker views={["month"]} format="MM" {...field} />
                )}
              />
              <Controller
                control={control}
                name="time"
                render={({ field }) => (
                  <CDatepicker views={["year"]} format="YYYY" {...field} />
                )}
              />
            </Stack>
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1} offset={1}>
          <Stack flexDirection="row" justifyContent="end">
            <CButton onClick={onSubmit} highlight>
              Tính khấu hao
            </CButton>
          </Stack>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
