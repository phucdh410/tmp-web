import { Controller } from "react-hook-form";

import { CDatepicker, CInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số phiếu bàn giao tài sản</CFormLabel>
            <Controller
              control={control}
              name="document_code"
              render={({ field }) => (
                <CInput
                  {...field}
                  disabled={isEdit}
                  placeholder="Số phiếu bàn giao tài sản"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số chứng từ bàn giao</CFormLabel>
            <Controller
              control={control}
              name="code"
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
            <CFormLabel required>Ngày bàn giao</CFormLabel>
            <Controller
              control={control}
              name="date"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
