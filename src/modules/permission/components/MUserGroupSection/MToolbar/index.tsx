import { CButton } from "@controls";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Add, Block, Build, DeleteForever, Save } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { IMToolbarProps } from "./types";

export const MToolbar = ({
  status,
  onEdit,
  onDelete,
  onCancel,
  onSave,
}: IMToolbarProps) => {
  return (
    <Stack direction="row" gap={1.25} mb={2}>
      <CButton size="small" disabled variant="outlined" startIcon={<Add />}>
        Thêm
      </CButton>
      <CButton
        size="small"
        onClick={onEdit}
        disabled={status !== CONTROL_STATUS.VIEWING}
        variant="outlined"
        startIcon={<Build />}
      >
        Sửa
      </CButton>
      <CButton
        size="small"
        onClick={onDelete}
        disabled={status !== CONTROL_STATUS.VIEWING}
        variant="outlined"
        startIcon={<DeleteForever />}
      >
        Xóa
      </CButton>
      {status === CONTROL_STATUS.EDITING && (
        <>
          <CButton
            onClick={onSave}
            size="small"
            disabled={status !== CONTROL_STATUS.EDITING}
            variant="outlined"
            startIcon={<Save />}
          >
            Lưu
          </CButton>
          <CButton
            onClick={onCancel}
            size="small"
            disabled={status !== CONTROL_STATUS.EDITING}
            variant="outlined"
            startIcon={<Block />}
          >
            Hủy
          </CButton>
        </>
      )}
    </Stack>
  );
};
