//note: PHÂN QUYỀN
export enum PERMISSION_TAB {
  USER = "user",
  GROUP = "group",
  REGION = "region",
}

export enum CONTROL_STATUS {
  IDLE = "idle",
  VIEWING = "viewing",
  EDITING = "editing",
}

export interface IControlContext {
  status: CONTROL_STATUS;
  setStatus: (status: CONTROL_STATUS) => void;
  id: string | number;
  setId: (id: string | number) => void;
}

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

export interface IAddUsersToTPMPayload {
  users: { code: string; username: string; fullname: string }[];
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

export interface IStoreInUserDataPayload {
  id?: number;
  store_id: number;
  code?: string;
  name?: string;
}

export interface IAreaInUserDataPayload {
  id?: number;
  area_id: number;
  code?: string;
  name?: string;
}

export interface IUserDataPayload {
  store_ids: IStoreInUserDataPayload[];
  area_ids: IAreaInUserDataPayload[];
}

export interface IArea {
  id: number;
  code: string;
  name: string;
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

export interface IUserInUserGroupData {
  id: number;
  user_id: number;
  code: string;
  name: string;
}

export interface IFeatureInUserGroupData {
  id: number;
  permission_id: number;
  permission_name: string;
  export: boolean;
  view: boolean;
  print: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
  confirm: boolean;
}

export interface IReportInUserGroupData {
  id: number;
  permission_id: number;
  permission_name: string;
  export: boolean;
  view: boolean;
  delete: boolean;
}

export interface IUserGroupData {
  id: number;
  code: string;
  name: string;
  users: IUserInUserGroupData[];
  features: IFeatureInUserGroupData[];
  reports: IReportInUserGroupData[];
}

export interface IUserCodeInAssignPermissionPayload {
  id?: number;
  code: string;
  fullname?: string;
}

export interface IFeatureInAssignPermissionPayload {
  id?: number;
  permission_id: number;
  print: boolean;
  add: boolean;
  export: boolean;
  view: boolean;
  update: boolean;
  delete: boolean;
  confirm: boolean;
}

export interface IReportInAssignPermissionPayload {
  id?: number;
  permission_id: number;
  export: boolean;
  view: boolean;
  delete: boolean;
}

export interface IAssignPermissionUserGroupPayload {
  role_id: number;
  user_codes: IUserCodeInAssignPermissionPayload[];
  features: IFeatureInAssignPermissionPayload[];
  reports: IReportInAssignPermissionPayload[];
}

export interface IAssignPermissionAssetRegionPayload {
  store_ids: IStoreInUserDataPayload[];
}

export interface IAssetRegionData {
  id: number;
  code: string;
  name: string;
  stores: IStoreInUserData[];
}
