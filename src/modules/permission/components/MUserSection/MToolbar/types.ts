import { CONTROL_STATUS } from "@interfaces/permissions";

export interface IMToolbarProps {
  status: CONTROL_STATUS;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}
