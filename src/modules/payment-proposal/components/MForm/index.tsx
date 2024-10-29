import { Controller } from "react-hook-form";

import {
  PAYMENT_PHASES_OPTIONS,
  PAYMENT_PROPOSAL_STATUSES_OPTIONS,
} from "@constants/options";
import { CAutocomplete, CDatepicker, CInput, CUpload } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MStoreInput } from "./MStoreInput";
import { MTotalInput } from "./MTotalInput";
import { MVendorInput } from "./MVendorInput";
import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false, setValue }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số phiếu đề xuất
              <br />
              mua hàng
            </CFormLabel>
            <Controller
              control={control}
              name="document_code"
              render={({ field }) => (
                <CInput
                  {...field}
                  disabled={isEdit}
                  placeholder="Số phiếu đề xuất mua hàng"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Ngày đề xuất
              <br />
              thanh toán
            </CFormLabel>
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker disabled={isEdit} error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Giai đoạn</CFormLabel>
            <Controller
              control={control}
              name="stage"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  options={PAYMENT_PHASES_OPTIONS}
                  error={!!error}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số CT thanh toán</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput
                  {...field}
                  readOnly
                  placeholder="Số CT thanh toán do hệ thống tự tạo"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Nhà cung cấp</CFormLabel>
            <MVendorInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Tổng tiền</CFormLabel>
            <MTotalInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <MStoreInput control={control} isEdit={isEdit} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Trạng thái</CFormLabel>
            <Controller
              control={control}
              name="status"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  options={PAYMENT_PROPOSAL_STATUSES_OPTIONS}
                  error={!!error}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Số phiếu BBNT</CFormLabel>
            <Controller
              control={control}
              name="so_phieu_bbnt"
              render={({ field }) => <CAutocomplete options={[]} {...field} />}
            />
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
            <CFormLabel required>Mô tả chi tiết</CFormLabel>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <CInput
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
            <CFormLabel>Số phiếu ghi tăng</CFormLabel>
            <Controller
              control={control}
              name="so_phieu_ghi_tang"
              render={({ field }) => <CAutocomplete options={[]} {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Upload file</CFormLabel>
            <Controller
              control={control}
              name="file_id"
              render={({ field, fieldState: { error } }) => (
                <CUpload error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
