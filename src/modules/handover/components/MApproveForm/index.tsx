import { Controller } from "react-hook-form";

import { HANDOVER_PHASES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { Grid2, Link, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMApproveFormProps } from "./types";

export const MApproveForm = ({ control, handoverData }: IMApproveFormProps) => {
  return (
    <Paper variant="tool-card">
      <Grid2 p={3} columns={2} spacing={3}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Số chứng từ</CFormLabel>
            <CInput disabled value={handoverData?.code ?? ""} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Tài sản bàn giao</CFormLabel>
            <CInput disabled value={handoverData?.name ?? ""} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Ngày bàn giao</CFormLabel>
            <CDatepicker disabled value={handoverData?.date ?? null} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Lý do bàn giao</CFormLabel>
            <CInput disabled value={handoverData?.reason ?? ""} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Người bàn giao</CFormLabel>
            <CInput disabled value={handoverData?.handover_user.name ?? null} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Người nhận bàn giao</CFormLabel>
            <CInput disabled value={handoverData?.receiver_user.name ?? null} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Upload file</CFormLabel>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              {handoverData?.documents.map((e) => (
                <Link key={e.id}>{e.original_name}</Link>
              ))}
            </Stack>
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Giai đoạn</CFormLabel>
            <Controller
              control={control}
              name="giai_doan"
              render={({ field }) => (
                <CAutocomplete options={HANDOVER_PHASES_OPTIONS} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>
              Ghi chú của quản lý
              <br />
              chi nhánh đi
            </CFormLabel>
            <Controller
              control={control}
              name="sender_store_note"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>
              Ghi chú của quản lý
              <br />
              chi nhánh đến
            </CFormLabel>
            <Controller
              control={control}
              name="receiver_store_note"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
