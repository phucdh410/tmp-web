import { useMemo, useState } from "react";
import { Controller, useWatch } from "react-hook-form";

import { assetValuationsApi } from "@apis/asset-valuations.api";
import { CDatepicker, CInput, CStoreInput } from "@controls";
import { Divider, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MAssets } from "./MAssets";
import { MDetailedInfo } from "./MDetailedInfo";
import { MPriceModify } from "./MPriceModify";
import { IMFormProps } from "./types";

export const MForm = ({ control, isEdit, id }: IMFormProps) => {
  //#region Data
  const assetsValue = useWatch({ control, name: "assets" });

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const assetId = useMemo(
    () =>
      selectedIndex !== null ? assetsValue[selectedIndex]?.asset_id : null,
    [assetsValue, selectedIndex]
  );

  const { data: assetInfo } = useQuery({
    queryKey: ["thong-tin-cua-tai-san", assetId],
    queryFn: () => assetValuationsApi.getAssetInformation(assetId!, id!),
    enabled: !!assetId && !!id,
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack direction="row" gap={2} my={3}>
      <Paper variant="tool-card" sx={{ p: 2 }}>
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
        <Divider sx={{ my: 2 }} />
        <MAssets
          control={control}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Paper>
      <Stack flex={1} gap={2}>
        <Paper variant="tool-card" sx={{ p: 2 }}>
          <MPriceModify
            control={control}
            index={selectedIndex}
            data={assetInfo}
          />
        </Paper>
        <Paper variant="tool-card" sx={{ p: 2 }}>
          <MDetailedInfo data={assetInfo} />
        </Paper>
      </Stack>
    </Stack>
  );
  //#endregion
};
