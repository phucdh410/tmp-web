import { CONTROL_STATUS } from "@modules/permission/types";

export interface IMToolbarProps {
  status: CONTROL_STATUS;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
