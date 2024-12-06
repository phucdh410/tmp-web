import { TCTableHeaders } from "@components/others/CTable/types";
import { ASSET_PROPOSAL_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { IAssetInAssetProposalDetail } from "@interfaces/asset-proposals";
import { Grid2, Paper, Stack } from "@mui/material";
import { CFile, CFormInputWrapper, CFormLabel, CTable } from "@others";

import { IMFormDetailProps } from "./types";

export const MFormDetail = ({ data }: IMFormDetailProps) => {
  const headers: TCTableHeaders<IAssetInAssetProposalDetail> = [
    {
      key: "asset_name",
      label: "tài sản bàn giao",
      align: "left",
    },
    {
      key: "asset_code",
      label: "mã tài sản",
      align: "left",
    },
    {
      key: "quantiy",
      label: "số lượng",
      columnType: "number",
      align: "right",
    },
    {
      key: "price",
      label: "đơn giá",
      align: "right",
      columnType: "number",
    },
    {
      key: "unit",
      label: "đơn vị tính",
      cellRender: () => <>Cái</>,
    },
    {
      key: "total",
      label: "thành tiền",
      cellRender: (value, record, index) => (
        <>{(record.quantity * record.price)?.toLocaleString()}</>
      ),
    },
    {
      key: "needed_date",
      label: "Thời gian cần",
      columnType: "date",
    },
    {
      key: "note",
      label: "Mô tả",
    },
  ];
  return (
    <Stack gap={3}>
      <Paper variant="tool-card">
        <Grid2 container columns={3} rowSpacing={2} columnSpacing={4}>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Số chứng từ</CFormLabel>
              <CInput disabled value={data?.document_code} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Ngày đề xuất</CFormLabel>
              <CDatepicker disabled value={data?.proposed_date} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Loại đề xuất</CFormLabel>
              <CAutocomplete
                disabled
                options={ASSET_PROPOSAL_STATUSES_OPTIONS}
                value={data?.proposed_type}
              />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Mô tả</CFormLabel>
              <CInput disabled value={data?.description} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Nhân viên đề xuất</CFormLabel>
              <CInput disabled value={data?.created_by} />
            </CFormInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFormInputWrapper percent={{ label: 35, input: 65 }}>
              <CFormLabel>Upload File</CFormLabel>
              {data?.files &&
                data?.files?.length > 0 &&
                data.files.map((e) => (
                  <CFile key={e.id} fileName={e.name} url={e.path} />
                ))}
            </CFormInputWrapper>
          </Grid2>
        </Grid2>
      </Paper>

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={data?.assets ?? []}
      />
    </Stack>
  );
};
