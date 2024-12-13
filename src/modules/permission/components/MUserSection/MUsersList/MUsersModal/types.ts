import { IUserInSystem } from "@interfaces/permissions";

export interface IMUsersModalRef {
  open: () => void;
}

export interface IMUsersModalProps {
  existingUsers?: IUserInSystem[];
  refetch?: () => void;
}
