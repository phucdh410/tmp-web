import { Controller } from "react-hook-form";

import { WARRANTY_LEVELS_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CDatepicker,
  CInput,
  CNumberInput,
  CPropertyInput,
  CQuantityItem,
  CRadioButton,
} from "@controls";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MAmountInput } from "./MAmountInput";
import { MDepreciationCostInput } from "./MDepreciationCostInput";
import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit = false }: IMFormProps) => {
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số chứng từ
              <br />
              xuất tài sản
            </CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  disabled={isEdit}
                  readOnly
                  placeholder="Số chứng từ do hệ thống tự tạo"
                  error={!!error}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày xuất tài sản</CFormLabel>
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker error={!!error} {...field} />
              )}
            />
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
            <CFormLabel required>Từ kho tài sản</CFormLabel>
            <Controller
              control={control}
              name="from_store_code"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={[]}
                  error={!!error}
                  placeholder="Chọn kho tài sản"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Mã tài sản</CFormLabel>
            <Controller
              control={control}
              name="asset_id"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  display="code"
                  options={[]}
                  error={!!error}
                  placeholder="Chọn tài sản"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số lượng</CFormLabel>
            <CQuantityItem control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đến chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="to_store_code"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={[]}
                  error={!!error}
                  placeholder="Chọn kho tài sản"
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>{" "}
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Tên tài sản</CFormLabel>
            <Controller
              control={control}
              name="asset_id"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={[]}
                  error={!!error}
                  placeholder="Chọn tài sản"
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
          <Stack height="100%" justifyContent="space-around">
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Số kỳ phân bổ</CFormLabel>
              <Controller
                control={control}
                name="depreciation_duration"
                render={({ field }) => <CNumberInput {...field} />}
              />
            </CFormInputWrapper>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Số tiền phân bổ</CFormLabel>
              <MDepreciationCostInput control={control} />
            </CFormInputWrapper>
          </Stack>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày bảo hành</CFormLabel>
            <Controller
              control={control}
              name="warranty_date"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Bảo hành</CFormLabel>
            <Stack direction="row" gap={1}>
              <Controller
                control={control}
                name="warranty_duration"
                render={({ field }) => <CNumberInput {...field} />}
              />
              <Controller
                control={control}
                name="warranty_level"
                render={({ field }) => (
                  <CAutocomplete options={WARRANTY_LEVELS_OPTIONS} {...field} />
                )}
              />
            </Stack>
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số hiệu</CFormLabel>
            <Controller
              control={control}
              name="model"
              render={({ field, fieldState: { error } }) => (
                <CInput error={!!error} placeholder="Nhập số hiệu" {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper height="100%" percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số phiếu
              <br />
              đề xuất mua hàng
            </CFormLabel>
            <Controller
              control={control}
              name="document_code"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete options={[]} error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thuộc tính</CFormLabel>
            <CPropertyInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }} height="100%">
            <CFormLabel required>Loại code</CFormLabel>
            <Controller
              control={control}
              name="barcode"
              render={({ field }) => (
                <CRadioButton
                  options={[
                    { value: 0, label: "QR Code" },
                    { value: 1, label: "Barcode" },
                  ]}
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