import { useState } from "react";

import { CNumberInput } from "@controls";
import { ExpandLess, ExpandMore, Lock } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CFilterInputWrapper } from "@others";

import { IMPriceInfoProps } from "./types";

export const MPriceInfo = ({ data }: IMPriceInfoProps) => {
  //#region Data
  const [open, setOpen] = useState(false);
  //#endregion

  //#region Event
  const onToggle = () => setOpen(!open);
  //#endregion

  //#region Render
  return (
    <>
      <Typography fontSize="1.5rem" fontWeight={500} textTransform="uppercase">
        thông tin định giá lại: {data?.code}
        <IconButton disabled={!data} onClick={onToggle} sx={{ ml: 2 }}>
          {!data ? <Lock /> : open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Typography>

      <Collapse in={open}>
        <Stack
          direction="row"
          mt={2}
          gap={3}
          divider={<Divider flexItem orientation="vertical" />}
        >
          <Stack flex={1} gap={1.4}>
            <Typography
              fontWeight={600}
              fontSize="1.1rem"
              display="flex"
              alignItems="center"
            >
              Giá trị gốc
            </Typography>
            <CFilterInputWrapper label="Tổng giá trị gốc">
              <CNumberInput disabled suffix="VNĐ" value={data?.detail.total} />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Hao mòn lũy kế">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.new_depreciation_accumulation}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Giá trị còn lại">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.new_remain_value}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Tỷ lệ hao mòn">
              <CNumberInput
                disabled
                suffix="%"
                value={data?.detail.new_wear_rate}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.new_annual_depreciation}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Số lượng">
              <CNumberInput disabled value={data?.detail.quantity} />
            </CFilterInputWrapper>
          </Stack>
          <Stack flex={1} gap={1.4}>
            <Typography fontWeight={600} fontSize="1.1rem">
              Giá trị đã khấu hao
            </Typography>
            <CFilterInputWrapper label="Tổng giá đã khấu hao">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.depreciation_accumulation}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Hao mòn lũy kế">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.old_depreciation_accumulation}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Giá trị còn lại">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.old_remain_value}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Tỷ lệ hao mòn">
              <CNumberInput
                disabled
                suffix="%"
                value={data?.detail.old_wear_rate}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.old_annual_depreciation}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Số lượng">
              <CNumberInput disabled value={data?.detail.quantity} />
            </CFilterInputWrapper>
          </Stack>
          <Stack flex={1} gap={1.4}>
            <Typography fontWeight={600} fontSize="1.1rem">
              Thay đổi (Chênh lệch)
            </Typography>
            <CFilterInputWrapper label="Tổng giá trị còn lại">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={data?.detail.remain_value}
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Hao mòn lũy kế">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={
                  (data?.detail.new_depreciation_accumulation ?? 0) -
                  (data?.detail.old_depreciation_accumulation ?? 0)
                }
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Giá trị còn lại">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={
                  (data?.detail.new_remain_value ?? 0) -
                  (data?.detail.old_remain_value ?? 0)
                }
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Tỷ lệ hao mòn">
              <CNumberInput
                disabled
                suffix="%"
                value={
                  (data?.detail.new_wear_rate ?? 0) -
                  (data?.detail.old_wear_rate ?? 0)
                }
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Hao mòn/Khấu hao năm">
              <CNumberInput
                disabled
                suffix="VNĐ"
                value={
                  (data?.detail.new_annual_depreciation ?? 0) -
                  (data?.detail.old_annual_depreciation ?? 0)
                }
              />
            </CFilterInputWrapper>
            <CFilterInputWrapper label="Số lượng">
              <CNumberInput
                disabled
                value={
                  (data?.detail.quantity ?? 0) - (data?.detail.quantity ?? 0)
                }
              />
            </CFilterInputWrapper>
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
  //#endregion
};
