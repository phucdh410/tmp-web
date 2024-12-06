import { ASSET_PROPOSAL_TYPES_OPTIONS } from "@constants/options";
import { CAutocomplete, CDatepicker, CInput } from "@controls";
import { Grid2, Paper } from "@mui/material";
import { CFile, CFormInputWrapper, CFormLabel } from "@others";

import { IMDetailProps } from "../types";

export const MInfo = ({ data }: IMDetailProps) => {
  return (
    <Paper variant="tool-card">
      <Grid2 container p={3} columns={3} rowSpacing={2} columnSpacing={4}>
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
              options={ASSET_PROPOSAL_TYPES_OPTIONS}
              value={data?.proposed_type}
            />
          </CFormInputWrapper>
        </Grid2>
        <Grid2 size={1}>
          <CFormInputWrapper percent={{ label: 35, input: 65 }}>
            <CFormLabel>Thời gian cần</CFormLabel>
            <CDatepicker disabled value={data?.needed_date} />
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
            <CFormLabel>Upload File</CFormLabel>
            {data?.files &&
              data?.files?.length > 0 &&
              data.files.map((e) => (
                <CFile key={e.id} fileName={e.name} url={e.path} />
              ))}
          </CFormInputWrapper>
        </Grid2>
        {data?.trackings &&
          data?.trackings?.length > 0 &&
          data.trackings.map((e) => (
            <Grid2 size={1} key={e.id}>
              <CFormInputWrapper percent={{ label: 35, input: 65 }}>
                <CFormLabel>{e.label}</CFormLabel>
                <CInput disabled value={e.reason} />
              </CFormInputWrapper>
            </Grid2>
          ))}
      </Grid2>
    </Paper>
  );
};
