import { CButton } from "@controls";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { IMToolbarProps } from "./types";

export const MToolbar = ({ status }: IMToolbarProps) => {
  return (
    <Stack direction="row" gap={1.25} mb={2}>
      <CButton size="small" disabled>
        Thêm
      </CButton>
      <CButton size="small" disabled={status !== CONTROL_STATUS.VIEWING}>
        Sửa
      </CButton>
      <CButton size="small" disabled={status !== CONTROL_STATUS.EDITING}>
        Lưu
      </CButton>
      <CButton size="small" disabled={status !== CONTROL_STATUS.VIEWING}>
        Xóa
      </CButton>
    </Stack>
  );
};
