import { useMemo, useState } from "react";
import { Controller, useWatch } from "react-hook-form";

import { assetValuationsApi } from "@apis/asset-valuations.api";
import { CDatepicker, CInput, CStoreInput } from "@controls";
import { IAssetInformation } from "@interfaces/asset-valuations";
import { Divider, Paper, Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MAssets } from "./MAssets";
import { MDetailedInfo } from "./MDetailedInfo";
import { MPriceModify } from "./MPriceModify";
import { IMFormProps } from "./types";

const MOCKDATA: IAssetInformation = {
  code: "BAN.T8.VP.PCU.0001",
  name: "Bàn làm việc chân sắt",
  store_name: "Ung Văn Khiêm",
  reason: "Đề xuất thay thế",
  warranty_date: new Date(2024, 8, 30),
  warranty_count: 4,
  repair_count: 4,
  bought_date: new Date(2024, 9, 4),
  category_name: "Loa thùng, loa súp",
  vendor_name: "Riot Entertainment",
  description: "2 thanh RAM",
  warranty_duration: 6,
  warranty_level: 2,
  properties: ["8GB", "màu trắng"],
  repair_cost: 2000000,
  use_date: new Date(2024, 10, 1),
  price: 5000000,
  unit: "Cái",
  quantity: 2,
  total: 10000000,
  depreciation_duration: 60,
  depreciation_cost: 165000,
  model: "BKJ-0001",
  deprecated_cost: 10000000,
  remaining_deprecated_cost: 10000000,
  original_values: {
    total: 3000000000,
    hao_mon_luy_ke: 3000000000,
    gia_tri_con_lai: 37000000,
    ty_le_hao_mon: 20,
    hao_mon_khau_hao: 23000000,
    quantity: 40,
  },
  deprecated_values: {
    total: 2000000000,
    hao_mon_luy_ke: 2000000000,
    gia_tri_con_lai: 20000000,
    ty_le_hao_mon: 20,
    hao_mon_khau_hao: 21000000,
    quantity: 30,
  },
};

export const MForm = ({ control, isEdit }: IMFormProps) => {
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
    queryFn: () => assetValuationsApi.getAssetInformation(assetId!),
    enabled: !!assetId,
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
            data={(selectedIndex !== null && MOCKDATA) || assetInfo}
          />
        </Paper>
        <Paper variant="tool-card" sx={{ p: 2 }}>
          <MDetailedInfo
            data={(selectedIndex !== null && MOCKDATA) || assetInfo}
          />
        </Paper>
      </Stack>
    </Stack>
  );
  //#endregion
};
