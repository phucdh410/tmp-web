import { CONTROL_STATUS } from "@modules/permission/types";

export interface IMToolbarProps {
  onAdd: () => void;
  status: CONTROL_STATUS;
}
