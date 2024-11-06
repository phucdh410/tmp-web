import { useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { warehousesApi } from "@apis/warehouses.api";
import { IMPORT_ASSET_TYPES } from "@constants/enums";
import { WARRANTY_LEVELS_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CCategoryInput,
  CDatepicker,
  CInput,
  CNumberInput,
  CPropertyInput,
  CQuantityItem,
  CVendorInput,
} from "@controls";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MAllocationAmountInput } from "./MAllocationAmountInput";
import { MAssetInput } from "./MAssetInput";
import { MAssetProposalInput } from "./MAssetProposalInput";
import { MImportTypeInput } from "./MImportTypeInput";
import { MTotalInput } from "./MTotalInput";
import { IMFormProps } from "./types";

export const MForm = ({
  control,
  isEdit = false,
  resetField,
  setValue,
}: IMFormProps) => {
  //#region Data
  const type = useWatch({ control, name: "type_import" });

  const isRecall = useMemo(() => type === IMPORT_ASSET_TYPES.RECALL, [type]);

  const { data: assets = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-tai-san"],
    queryFn: () => assetsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        id: e.id,
        label: e.code,
        code: e.code,
      })),
  });

  const { data: warehouses = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-kho"],
    queryFn: () => warehousesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.name })),
  });
  //#endregion

  //#region Event

  //#endregion

  //#region Render
  return (
    <Paper variant="tool-card" sx={{ my: 3 }}>
      <Grid2 p={3} container columns={3} rowSpacing={2} columnSpacing={4}>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Loại nhập kho</CFormLabel>
            <MImportTypeInput
              control={control}
              isEdit={isEdit}
              resetField={resetField}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={2} />
        <Grid2 size={1}>
          <CFormInputWrapper height="100%" percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số phiếu
              <br />
              đề xuất mua hàng
            </CFormLabel>
            <MAssetProposalInput control={control} isEdit={isEdit} />
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
                  disabled={isRecall}
                  placeholder={
                    isRecall
                      ? "Dựa theo mã tài sản"
                      : "Nhập tên công cụ dụng cụ"
                  }
                  {...field}
                />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          {isRecall ? (
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Mã tài sản</CFormLabel>
              <MAssetInput
                control={control}
                assets={assets}
                setValue={setValue}
              />
            </CFormInputWrapper>
          ) : (
            <></>
          )}
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số chứng từ
              <br />
              nhập tài sản
            </CFormLabel>
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
            <CFormLabel required>Loại CCDC</CFormLabel>
            <CCategoryInput control={control} disabled={isRecall} />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Đơn giá</CFormLabel>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <CNumberInput {...field} disabled={isRecall} suffix="VNĐ" />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày nhập kho</CFormLabel>
            <Controller
              control={control}
              name="import_date"
              render={({ field, fieldState: { error } }) => (
                <CDatepicker error={!!error} {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Nhà cung cấp</CFormLabel>
            <CVendorInput control={control} />
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
            <CFormLabel required>Kho tài sản</CFormLabel>
            <Controller
              control={control}
              name="warehouse_id"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  options={warehouses}
                  error={!!error}
                  placeholder="Chọn kho tài sản"
                  {...field}
                />
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
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Thành tiền</CFormLabel>
            <MTotalInput control={control} />
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
                  disabled={isRecall}
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
                name="allocation_period"
                render={({ field }) => (
                  <CNumberInput {...field} disabled={isRecall} />
                )}
              />
            </CFormInputWrapper>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel required>Số tiền phân bổ</CFormLabel>
              <MAllocationAmountInput control={control} disabled={isRecall} />
            </CFormInputWrapper>
          </Stack>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày bảo hành</CFormLabel>
            <Controller
              control={control}
              name="warranty_begin_date"
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
              name="identifier"
              render={({ field, fieldState: { error } }) => (
                <CInput error={!!error} placeholder="Nhập số hiệu" {...field} />
              )}
            />
          </CFormInputWrapper>
        </Grid2>
      </Grid2>
    </Paper>
  );
  //#endregion
};
