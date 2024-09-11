import { Controller } from "react-hook-form";

import { WARRANTY_LEVELS_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CCheckbox,
  CDatepicker,
  CInput,
  CNumberInput,
  CRadioButton,
} from "@controls";
import { Paper, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MCategoryInput } from "./MCategoryInput";
import { MPropertyInput } from "./MPropertyInput";
import { MStoreInput } from "./MStoreInput";
import { MUnitInput } from "./MUnitInput";
import { MVendorInput } from "./MVendorInput";
import { IMFormProps } from "./types";
import { MAmountInput } from "./MAmountInput";
import { MDepreciationCostInput } from "./MDepreciationCostInput";

export const MForm = ({ control }: IMFormProps) => {
  return (
    <Paper sx={{ boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.10)", my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số CT ghi tăng</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => <CInput {...field} readOnly />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày ghi tăng</CFormLabel>
            <Controller
              control={control}
              name="depreciation_date"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn giá</CFormLabel>
            <Controller
              control={control}
              name="price"
              render={({ field }) => <CNumberInput {...field} suffix="VNĐ" />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Tên CCDC</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Loại CCDC</CFormLabel>
            <MCategoryInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn vị tính</CFormLabel>
            <Stack direction="row" gap={1}>
              <Stack maxWidth="40%">
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
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <MStoreInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Nhà cung cấp</CFormLabel>
            <MVendorInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thành tiền</CFormLabel>
            <MAmountInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Lý do ghi tăng</CFormLabel>
            <Controller
              control={control}
              name="reason"
              render={({ field }) => <CInput rows={4} {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Mô tả chi tiết</CFormLabel>
            <Controller
              control={control}
              name="note"
              render={({ field }) => <CInput rows={4} {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
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
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày bảo hành</CFormLabel>
            <Controller
              control={control}
              name="warranty_date"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
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
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Số hiệu</CFormLabel>
            <Controller
              control={control}
              name="model"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
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
        <Grid2 xs={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thuộc tính</CFormLabel>
            <MPropertyInput control={control} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 xs={1}>
          <CFormInputWrapper height="100%" percent={{ label: 35, input: 65 }}>
            <CFormLabel>Tách riêng mã</CFormLabel>
            <Controller
              control={control}
              name="split_code"
              render={({ field }) => <CCheckbox {...field} />}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
