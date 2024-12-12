import { CButton } from "@controls";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { IMToolbarProps } from "./types";

export const MToolbar = ({
  status,
  onAdd,
  onEdit,
  onDelete,
  onCancel,
  onSave,
}: IMToolbarProps) => {
  return (
    <Stack direction="row" gap={1.25} mb={2}>
      <CButton size="small" onClick={onAdd}>
        Thêm
      </CButton>
      <CButton
        size="small"
        onClick={onEdit}
        disabled={status !== CONTROL_STATUS.VIEWING}
      >
        Sửa
      </CButton>
      <CButton
        size="small"
        onClick={onDelete}
        disabled={status !== CONTROL_STATUS.VIEWING}
      >
        Xóa
      </CButton>
      {status === CONTROL_STATUS.EDITING && (
        <>
          <CButton
            onClick={onSave}
            size="small"
            disabled={status !== CONTROL_STATUS.EDITING}
          >
            Lưu
          </CButton>
          <CButton
            onClick={onCancel}
            size="small"
            disabled={status !== CONTROL_STATUS.EDITING}
          >
            Hủy
          </CButton>
        </>
      )}
    </Stack>
  );
};
