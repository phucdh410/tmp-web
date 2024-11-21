import { Controller } from "react-hook-form";

import { CInput, CNumberInput } from "@controls";
import { Divider, Stack, Typography } from "@mui/material";
import { CFilterInputWrapper, CFormInputWrapper, CFormLabel } from "@others";

import { IMPriceModifyProps } from "./types";

export const MPriceModify = ({ control, index, data }: IMPriceModifyProps) => {
  return (
    <>
      <Typography
        mb={2}
        fontSize="1.5rem"
        fontWeight={500}
        textTransform="uppercase"
      >
        thông tin định giá lại
      </Typography>

      {index !== null && (
        <Stack mb={2} direction="row" alignItems="center" gap={3}>
          <CFormInputWrapper width={320} percent={{ label: 40, input: 60 }}>
            <CFormLabel>Định giá tài sản</CFormLabel>
            <Controller
              control={control}
              name={`assets.${index}.dinh_gia_tai_san`}
              render={({ field }) => <CNumberInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper width={420} percent={{ label: 30, input: 70 }}>
            <CFormLabel>Ghi chú định giá</CFormLabel>
            <Controller
              control={control}
              name={`assets.${index}.note`}
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
        </Stack>
      )}

      <Stack
        direction="row"
        gap={3}
        divider={<Divider flexItem orientation="vertical" />}
      >
        <Stack flex={1} gap={1.4}>
          <Typography fontWeight={600} fontSize="1.1rem">
            Giá trị gốc
          </Typography>
          <CFilterInputWrapper label="Tổng giá trị gốc">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.original_values.total}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Hào mòn lũy kế">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.original_values.hao_mon_luy_ke}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Giá trị còn lại">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.original_values.gia_tri_con_lai}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Tỷ lệ hao mòn">
            <CNumberInput
              disabled
              suffix="%"
              value={data?.original_values.ty_le_hao_mon}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.original_values.hao_mon_khau_hao}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Số lượng">
            <CNumberInput disabled value={data?.original_values.quantity} />
          </CFilterInputWrapper>
        </Stack>
        <Stack flex={1} gap={1.4}>
          <Typography fontWeight={600} fontSize="1.1rem">
            Giá trị đã khấu hao
          </Typography>
          <CFilterInputWrapper label="Tổng giá trị gốc">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.deprecated_values.total}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Hào mòn lũy kế">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.deprecated_values.hao_mon_luy_ke}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Giá trị còn lại">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.deprecated_values.gia_tri_con_lai}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Tỷ lệ hao mòn">
            <CNumberInput
              disabled
              suffix="%"
              value={data?.deprecated_values.ty_le_hao_mon}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={data?.deprecated_values.hao_mon_khau_hao}
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Số lượng">
            <CNumberInput disabled value={data?.deprecated_values.quantity} />
          </CFilterInputWrapper>
        </Stack>
        <Stack flex={1} gap={1.4}>
          <Typography fontWeight={600} fontSize="1.1rem">
            Thay đổi (Chênh lệch)
          </Typography>
          <CFilterInputWrapper label="Tổng giá trị gốc">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={
                (data?.original_values.total ?? 0) -
                (data?.deprecated_values.total ?? 0)
              }
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Hào mòn lũy kế">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={
                (data?.original_values.hao_mon_luy_ke ?? 0) -
                (data?.deprecated_values.hao_mon_luy_ke ?? 0)
              }
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Giá trị còn lại">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={
                (data?.original_values.gia_tri_con_lai ?? 0) -
                (data?.deprecated_values.gia_tri_con_lai ?? 0)
              }
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Tỷ lệ hao mòn">
            <CNumberInput
              disabled
              suffix="%"
              value={
                (data?.original_values.ty_le_hao_mon ?? 0) -
                (data?.deprecated_values.ty_le_hao_mon ?? 0)
              }
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
            <CNumberInput
              disabled
              suffix="VNĐ"
              value={
                (data?.original_values.hao_mon_khau_hao ?? 0) -
                (data?.deprecated_values.hao_mon_khau_hao ?? 0)
              }
            />
          </CFilterInputWrapper>
          <CFilterInputWrapper label="Số lượng">
            <CNumberInput
              disabled
              value={
                (data?.original_values.quantity ?? 0) -
                (data?.deprecated_values.quantity ?? 0)
              }
            />
          </CFilterInputWrapper>
        </Stack>
      </Stack>
    </>
  );
};
