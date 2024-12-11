//note: PHÂN QUYỀN
export interface IUserInSystem {
  id: number;
  code: string;
  fullname: string;
}

export interface IParamsToGetUsersFromPos {
  code?: string;
  name?: string;
}

export interface IUserFromPos {
  code: string;
  username: string;
  fullname: string;
}

export interface IArea {
  id: number;
  code: string;
  name: string;
}

export interface IAddUsersToTPMPayload {
  users: { code: string; username: string; fullname: string }[];
}

export interface IUserGroup {
  id: number;
  code: string;
  name: string;
  active: boolean;
}

export interface IUserGroupPayload {
  code: string;
  name: string;
}
