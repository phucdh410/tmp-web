import { Controller } from "react-hook-form";

import { CDatepicker, CInput, CStoreInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MInChargeUser } from "./MInChargeUser";
// import { MCheckUsers } from "./MCheckUsers";
import { IMFormProps } from "./types";

export const MForm = ({ control }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Số chứng từ</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput
                  {...field}
                  readOnly
                  placeholder="Số chứng từ do hệ thống tự tạo"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Ngày kiểm</CFormLabel>
            <Controller
              control={control}
              name="stocktake_date"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Ngày chứng từ</CFormLabel>
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <CStoreInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>NV phụ trách kiểm</CFormLabel>
            <MInChargeUser control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Ghi chú</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <CInput placeholder="Ghi chú cho phiếu" {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
      {/* <MCheckUsers control={control} /> */}
    </Paper>
  );
};
