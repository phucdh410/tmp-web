import { useState } from "react";

import { WARRANTY_LEVELS_OPTIONS } from "@constants/options";
import { CDatepicker, CInput, CNumberInput } from "@controls";
import { ExpandLess, ExpandMore, Lock } from "@mui/icons-material";
import { Collapse, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMDetailedInfoProps } from "./types";

export const MDetailedInfo = ({ data }: IMDetailedInfoProps) => {
  //#region Data
  const [open, setOpen] = useState(false);
  //#endregion

  //#region Event
  const onToggle = () => setOpen(!open);
  //#endregion

  //#region Render
  return (
    <>
      <Typography fontSize="1.5rem" fontWeight={500}>
        Thông tin chi tiết tài sản: {data?.code}
        <IconButton disabled={!data} onClick={onToggle} sx={{ ml: 2 }}>
          {!data ? <Lock /> : open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Typography>

      <Collapse in={open}>
        <Grid2 mt={2} container columns={3} columnSpacing={3} rowSpacing={2}>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Mã tài sản</CFormLabel>
              <CInput disabled value={data?.code} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Ngày mua
                <br />
                tài sản
              </CFormLabel>
              <CDatepicker disabled value={data?.bought_date} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Ngày đưa vào
                <br />
                sử dụng
              </CFormLabel>
              <CDatepicker disabled value={data?.use_date} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Tên CCDC</CFormLabel>
              <CInput disabled value={data?.name} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Loại CCDC</CFormLabel>
              <CInput disabled value={data?.category.name} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Nguyên giá</CFormLabel>
              <CNumberInput disabled value={data?.price} suffix="VNĐ" />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Chi nhánh</CFormLabel>
              <CInput disabled value={data?.store.name} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Nhà cung cấp</CFormLabel>
              <CInput disabled value={data?.vendor_name} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Số lượng</CFormLabel>
              <CInput
                disabled
                value={data ? `${data?.quantity} ${data?.unit}` : ""}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Lý do ghi tăng</CFormLabel>
              <CInput disabled value={data?.reason} rows={4} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Mô tả chi tiết</CFormLabel>
              <CInput disabled value={data?.description} rows={4} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <Stack height="100%" justifyContent="space-around">
              <CFormInputWrapper percent={{ label: 35, input: 65 }}>
                <CFormLabel>Thành tiền</CFormLabel>
                <CNumberInput disabled value={data?.total} suffix="VNĐ" />
              </CFormInputWrapper>
              <CFormInputWrapper percent={{ label: 35, input: 65 }}>
                <CFormLabel>Số kỳ phân bổ</CFormLabel>
                <CNumberInput
                  disabled
                  value={data?.depreciation_duration}
                  suffix="kỳ"
                />
              </CFormInputWrapper>
            </Stack>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Ngày bảo hành</CFormLabel>
              <CDatepicker disabled value={data?.warranty_date} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Bảo hành</CFormLabel>
              <CInput
                disabled
                value={
                  data
                    ? `${data?.warranty_duration} ${
                        WARRANTY_LEVELS_OPTIONS.find(
                          (e) => e.id === data?.warranty_level
                        )?.label
                      }`
                    : ""
                }
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Số tiền
                <br />
                phân bổ
              </CFormLabel>
              <CNumberInput
                disabled
                value={data?.depreciation_cost}
                suffix="VNĐ/kỳ"
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Số lần
                <br />
                bảo hành
              </CFormLabel>
              <CNumberInput disabled value={data?.warranty_count} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Thuộc tính</CFormLabel>
              <CInput disabled value={data?.properties?.join(", ")} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Số tiền còn
                <br />
                khấu hao
              </CFormLabel>
              <CNumberInput
                disabled
                value={data?.remaining_deprecated_cost}
                suffix="VNĐ"
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Số lần
                <br />
                sửa chữa
              </CFormLabel>
              <CNumberInput disabled value={data?.repair_count} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Số tiền
                <br />
                sửa chữa
              </CFormLabel>
              <CNumberInput disabled value={data?.repair_cost} suffix="VNĐ" />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>
                Số tiền đã
                <br />
                khấu hao
              </CFormLabel>
              <CNumberInput
                disabled
                value={data?.depreciation_cost}
                suffix="VNĐ"
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Số hiệu</CFormLabel>
              <CInput disabled value={data?.model} />
            </CFormInputWrapper>
          </Grid2>
        </Grid2>
      </Collapse>
    </>
  );
  //#endregion
};
