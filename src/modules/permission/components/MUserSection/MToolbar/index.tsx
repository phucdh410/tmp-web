import { CToolbarButtons } from "@controls";
import { CONTROL_STATUS } from "@interfaces/permissions";
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
      <CToolbarButtons.Add onClick={onAdd}>Thêm</CToolbarButtons.Add>
      <CToolbarButtons.Edit
        onClick={onEdit}
        disabled={status !== CONTROL_STATUS.VIEWING}
      >
        Sửa
      </CToolbarButtons.Edit>
      <CToolbarButtons.Delete
        onClick={onDelete}
        disabled={status !== CONTROL_STATUS.VIEWING}
      >
        Xóa
      </CToolbarButtons.Delete>
      {status === CONTROL_STATUS.EDITING && (
        <>
          <CToolbarButtons.Save
            onClick={onSave}
            disabled={status !== CONTROL_STATUS.EDITING}
          >
            Lưu
          </CToolbarButtons.Save>
          <CToolbarButtons.Cancel
            onClick={onCancel}
            disabled={status !== CONTROL_STATUS.EDITING}
          >
            Hủy
          </CToolbarButtons.Cancel>
        </>
      )}
    </Stack>
  );
};
