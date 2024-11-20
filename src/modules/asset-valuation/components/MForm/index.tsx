import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";

import { CDatepicker, CInput, CStoreInput } from "@controls";
import { Divider, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MAssets } from "./MAssets";
import { MDetailedInfo } from "./MDetailedInfo";
import { MPriceModify } from "./MPriceModify";
import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit }: IMFormProps) => {
  //#region Data
  const assetsValue = useWatch({ control, name: "assets" });

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack direction="row" gap={2} my={3}>
      <Paper sx={{ p: 2 }}>
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
              render={({ field }) => <CInput {...field} disabled />}
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
              name="ngay_lap_chung_tu"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Ngày định giá</CFormLabel>
            <Controller
              control={control}
              name="ngay_dinh_gia_lai"
              render={({ field }) => <CDatepicker {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <CStoreInput
              control={control}
              isEdit={isEdit}
              disabled={!!assetsValue.length}
            />
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
              name="note"
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
        <Divider sx={{ my: 2 }} />
        <MAssets control={control} />
      </Paper>
      <Stack flex={1} gap={2}>
        <Paper sx={{ p: 2 }}>
          <MPriceModify control={control} index={selectedIndex} />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <MDetailedInfo control={control} index={selectedIndex} />
        </Paper>
      </Stack>
    </Stack>
  );
  //#endregion
};
