import { Controller } from "react-hook-form";

import { ACCEPTANCE_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput, CNumberInput } from "@controls";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MAmountInput } from "./MAmountInput";
import { MAssetProposalInput } from "./MAssetProposalInput";
import { MCategoryInput } from "./MCategoryInput";
import { MStoreInput } from "./MStoreInput";
import { MUnitInput } from "./MUnitInput";
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
            <MAssetProposalInput
              control={control}
              isEdit={isEdit}
              setValue={setValue}
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
            <CFormLabel required>Tên CCDC</CFormLabel>
            <Controller
              control={control}
              name="asset_name"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  error={!!error}
                  placeholder="Nhập tên công cụ dụng cụ"
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
            <CFormLabel required>Loại CCDC</CFormLabel>
            <MCategoryInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn giá</CFormLabel>
            <Controller
              control={control}
              name="price"
              render={({ field }) => <CNumberInput {...field} suffix="VNĐ" />}
            />
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
            <CFormLabel required>Nhà cung cấp</CFormLabel>
            <MVendorInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn vị tính</CFormLabel>
            <Stack direction="row" gap={1}>
              <Stack minWidth="40%" width="40%">
                <MUnitInput control={control} />
              </Stack>
              <CFormInputWrapper percent={{ label: 50, input: 50 }}>
                <CFormLabel required>Số lượng</CFormLabel>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => <CNumberInput min={1} {...field} />}
                />
              </CFormInputWrapper>
            </Stack>
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Lý do</CFormLabel>
            <Controller
              control={control}
              name="reason"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  rows={4}
                  error={!!error}
                  placeholder="Nhập lý do"
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
              name="description"
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
            <CFormLabel required>Thành tiền</CFormLabel>
            <MAmountInput control={control} />
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
                  options={ACCEPTANCE_STATUSES_OPTIONS}
                  error={!!error}
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};