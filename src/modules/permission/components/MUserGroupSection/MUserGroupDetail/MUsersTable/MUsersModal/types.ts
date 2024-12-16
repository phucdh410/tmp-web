import { IUserInSystem } from "@interfaces/permissions";

export interface IMUsersModalRef {
  open: () => void;
}

interface IExistingUsers extends Omit<IUserInSystem, "id" | "fullname"> {}

export interface IMUsersModalProps {
  existingUsers?: IExistingUsers[];
  onAddUsers: (addedUsers: IUserInSystem[]) => void;
}
