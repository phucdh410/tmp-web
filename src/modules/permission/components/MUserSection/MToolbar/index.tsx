import { CButton } from "@controls";
import { Stack } from "@mui/material";

export const MToolbar = ({ onAdd }) => {
  return (
    <Stack direction="row" gap={1.25} mb={2}>
      <CButton size="small" onClick={onAdd}>
        Thêm
      </CButton>
      <CButton size="small">Lưu</CButton>
      <CButton size="small">Xóa</CButton>
      <CButton size="small">Sửa</CButton>
    </Stack>
  );
};
