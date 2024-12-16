import { CONTROL_STATUS } from "@modules/permission/types";

export interface IMToolbarProps {
  status: CONTROL_STATUS;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}
