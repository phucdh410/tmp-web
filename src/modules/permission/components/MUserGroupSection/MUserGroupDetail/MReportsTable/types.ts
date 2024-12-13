import { Control, UseFormSetValue } from "react-hook-form";

import { IAssignPermissionUserGroupPayload } from "@interfaces/permissions";

export interface IMReportsTableProps {
  control: Control<IAssignPermissionUserGroupPayload>;
  setValue: UseFormSetValue<IAssignPermissionUserGroupPayload>;
}
