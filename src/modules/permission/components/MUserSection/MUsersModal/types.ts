import { IUserFromPos, IUserInSystem } from "@interfaces/permissions";

export interface IMUsersModalRef {
  open: () => void;
}

interface IExistingUsers extends Omit<IUserInSystem, "id" | "fullname"> {}

export interface IMUsersModalProps {
  existingUsers?: IExistingUsers[];
  refetch?: () => void;
  onOutsideSubmit?: (payload: IUserFromPos[]) => void;
}
