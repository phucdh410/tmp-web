import { Controller } from "react-hook-form";

import { HANDOVER_PHASES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { Grid2, Link, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMApproveFormProps } from "./types";

export const MApproveForm = ({ control, handoverData }: IMApproveFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 container p={3} columns={2} spacing={3}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Số chứng từ</CFormLabel>
            <CInput disabled value={handoverData?.code ?? ""} />
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
            <CFormLabel>Giai đoạn</CFormLabel>
            <Controller
              control={control}
              name="tracking_type"
              render={({ field }) => (
                <CAutocomplete options={HANDOVER_PHASES_OPTIONS} {...field} />
              )}
            />
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
            <CFormLabel>
              Ghi chú của quản lý
              <br />
              chi nhánh nhận
            </CFormLabel>
            <Controller
              control={control}
              name="receiver_store_note"
              render={({ field }) => (
                <CInput
                  {...field}
                  rows={2}
                  placeholder="Nhập nội dung ghi chú"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Ghi chú TBP tài sản</CFormLabel>
            <Controller
              control={control}
              name="asset_note"
              render={({ field }) => (
                <CInput
                  {...field}
                  rows={2}
                  placeholder="Nhập nội dung ghi chú"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Upload file</CFormLabel>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              {handoverData?.documents &&
                handoverData.documents?.length > 0 &&
                handoverData.documents.map((e) => (
                  <Link key={e.id}>{e.original_name}</Link>
                ))}
            </Stack>
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
