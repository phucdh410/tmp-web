import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton } from "@controls";
import { Paper, Stack } from "@mui/material";
import { CFormLabel } from "@others";

export const MFilter = ({ options, params, onAdd }) => {
  return (
    <Paper variant="tool-card" sx={{ mt: 3 }}>
      <Stack
        px={8}
        py={4}
        gap={8}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" gap={5} flex={1 / 3}>
          <CFormLabel>Tiêu chí tiện ích</CFormLabel>
          <CAutocomplete
            options={[
              { id: "", label: "Tất cả" },
              ...(options?.length > 0 ? [...options] : []),
            ]}
            value={params?.amenity_criteria_code}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={5} flex={1 / 3}>
          <CFormLabel required>Trạng thái</CFormLabel>
          <CAutocomplete
            options={STATUS_OPTIONS ?? []}
            value={params?.status}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} flex={1 / 3}>
          <CButton>Lọc</CButton>
          <CButton onClick={onAdd}>Thêm tiện ích</CButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
