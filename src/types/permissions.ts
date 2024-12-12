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

export interface IStoreInUserData {
  id: number;
  store_id: number;
  code: string;
  name: string;
}

export interface IAreaInUserData {
  id: number;
  area_id: number;
  code: string;
  name: string;
}

export interface IUserData {
  code: string;
  name: string;
  stores: IStoreInUserData[];
  areas: IAreaInUserData[];
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

export interface IFeatureInPermissionResponse {
  id: number;
  code: string;
  name: string;
  view: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
  print: boolean;
  confirm: boolean;
}

export interface IReportInPermissionResponse {
  id: number;
  code: string;
  name: string;
  view: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
  print: boolean;
  confirm: boolean;
}

export interface IPermissionResponse {
  features: IFeatureInPermissionResponse[];
  reports: IReportInPermissionResponse[];
}

export interface IAreaPayload extends IUserGroupPayload {}
