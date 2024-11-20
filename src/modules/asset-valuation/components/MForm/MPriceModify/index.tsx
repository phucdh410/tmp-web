import { Controller } from "react-hook-form";

import { CInput, CNumberInput } from "@controls";
import { Divider, Stack, Typography } from "@mui/material";
import { CFilterInputWrapper, CFormInputWrapper, CFormLabel } from "@others";

import { IMPriceModifyProps } from "./types";
const index = 1;
export const MPriceModify = ({ control }: IMPriceModifyProps) => {
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

      {index ? (
        <>
          <Stack mb={2} direction="row" alignItems="center" gap={3}>
            <CFormInputWrapper width={320} percent={{ label: 40, input: 60 }}>
              <CFormLabel>Định giá tài sản</CFormLabel>
              <Controller
                control={control}
                name={`assets.${index}.dinh_gia_tai_san`}
                render={({ field }) => <CNumberInput {...field} />}
              />
            </CFormInputWrapper>
            <CFormInputWrapper width={320} percent={{ label: 40, input: 60 }}>
              <CFormLabel>Ghi chú định giá</CFormLabel>
              <Controller
                control={control}
                name={`assets.${index}.note`}
                render={({ field }) => <CInput {...field} />}
              />
            </CFormInputWrapper>
          </Stack>
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
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Hào mòn lũy kế">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Giá trị còn lại">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Tỷ lệ hao mòn">
                <CNumberInput disabled suffix="%" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Số lượng">
                <CNumberInput disabled />
              </CFilterInputWrapper>
            </Stack>
            <Stack flex={1} gap={1.4}>
              <Typography fontWeight={600} fontSize="1.1rem">
                Giá trị đã khấu hao
              </Typography>
              <CFilterInputWrapper label="Tổng giá trị gốc">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Hào mòn lũy kế">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Giá trị còn lại">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Tỷ lệ hao mòn">
                <CNumberInput disabled suffix="%" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Số lượng">
                <CNumberInput disabled />
              </CFilterInputWrapper>
            </Stack>
            <Stack flex={1} gap={1.4}>
              <Typography fontWeight={600} fontSize="1.1rem">
                Thay đổi (Chênh lệch)
              </Typography>
              <CFilterInputWrapper label="Tổng giá trị gốc">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Hào mòn lũy kế">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Giá trị còn lại">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Tỷ lệ hao mòn">
                <CNumberInput disabled suffix="%" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
                <CNumberInput disabled suffix="VNĐ" />
              </CFilterInputWrapper>
              <CFilterInputWrapper label="Số lượng">
                <CNumberInput disabled />
              </CFilterInputWrapper>
            </Stack>
          </Stack>
        </>
      ) : (
        <Typography>Hãy chọn 1 tài sản để xem thông tin định giá</Typography>
      )}
    </>
  );
};
