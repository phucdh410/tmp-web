import { Control } from "react-hook-form";

import { IAssignPermissionUserGroupPayload } from "@interfaces/permissions";

export interface IMUsersTableProps {
  control: Control<IAssignPermissionUserGroupPayload>;
}
