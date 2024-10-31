import { Controller } from "react-hook-form";

import { CAutocomplete, CComplexUpload, CDatepicker, CInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số phiếu
              <br />
              bàn giao tài sản
            </CFormLabel>
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
            <CFormLabel required>Người bàn giao</CFormLabel>
            <Controller
              control={control}
              name="handover_user_id"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  placeholder="Chọn người bàn giao"
                  options={[]}
                  {...field}
                  error={!!error}
                  errorText={error?.message}
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
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số chứng từ
              <br />
              bàn giao
            </CFormLabel>
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
            <CFormLabel required>
              Người nhận
              <br />
              bàn giao
            </CFormLabel>
            <Controller
              control={control}
              name="receiver_user_id"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  placeholder="Chọn người nhận bàn giao"
                  options={[]}
                  {...field}
                  error={!!error}
                  errorText={error?.message}
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
              name="documents"
              render={({ field }) => <CComplexUpload {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
