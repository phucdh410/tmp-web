import { Controller } from "react-hook-form";

import { CDatepicker, CInput, CStoreInput } from "@controls";
import { Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MAssets } from "./MAssets";
import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit, id }: IMFormProps) => {
  //#region Data
  // const { data: assetInfo } = useQuery({
  //   queryKey: ["thong-tin-cua-tai-san", assetId],
  //   queryFn: () => assetValuationsApi.getAssetInformation(assetId!, id!),
  //   enabled: !!assetId && !!id,
  //   select: (response) => response?.data?.data,
  // });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack direction="row" gap={2} my={3} alignItems="start">
      <Paper variant="tool-card" sx={{ p: 2, flexShrink: 0 }}>
        <Stack gap={1.3}>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Số CT
              <br />
              định giá
            </CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput
                  {...field}
                  disabled
                  placeholder="Số chứng từ do hệ thống tự tạo"
                />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Ngày lập
              <br />
              chứng từ
            </CFormLabel>
            <Controller
              control={control}
              name="date"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày định giá</CFormLabel>
            <Controller
              control={control}
              name="valuation_date"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <CStoreInput control={control} isEdit={isEdit} />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Lý do
              <br />
              đánh giá lại
            </CFormLabel>
            <Controller
              control={control}
              name="reason"
              render={({ field }) => (
                <CInput {...field} placeholder="Nhập lý do định giá" />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>
              Nội dung
              <br />
              chứng từ
            </CFormLabel>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <CInput
                  rows={3}
                  {...field}
                  placeholder="Nhập nội dung chứng từ"
                />
              )}
            />
          </CFormInputWrapper>
        </Stack>
      </Paper>
      <MAssets control={control} />
    </Stack>
  );
  //#endregion
};
