import { apiInstance } from "@axios/index";
import {
  IAddUsersToTPMPayload,
  IArea,
  IAreaPayload,
  IAssignPermissionUserGroupPayload,
  IParamsToGetUsersFromPos,
  IPermissionResponse,
  IUserData,
  IUserDataPayload,
  IUserFromPos,
  IUserGroup,
  IUserGroupData,
  IUserGroupPayload,
  IUserInSystem,
} from "@interfaces/permissions";
import { IApiResponse } from "@interfaces/response";

export const permissionsApi = {
  getUsersFromPos: async (
    params?: IParamsToGetUsersFromPos
  ): Promise<IApiResponse<IUserFromPos[]>> => {
    return apiInstance.get("/auth/users", { params });
  },
  getUsersInSystem: async (): Promise<IApiResponse<IUserInSystem[]>> => {
    return apiInstance.get("/users");
  },
  addUsersToTPM: async (body: IAddUsersToTPMPayload) => {
    return apiInstance.post("/users", body);
  },
  removeUser: async (id: string | number) => {
    return apiInstance.delete(`/users/assignee/${id}`);
  },
  getUserDataById: async (
    id: string | number
  ): Promise<IApiResponse<IUserData>> => {
    return apiInstance.get(`/users/${id}`);
  },
  updateUserData: async (id: string | number, body: IUserDataPayload) => {
    return apiInstance.put(`/users/assignee/${id}`, body);
  },
  getAreas: async (): Promise<IApiResponse<IArea[]>> => {
    return apiInstance.get("/areas");
  },
  getUserGroups: async (params?: {
    active: 0 | 1;
  }): Promise<IApiResponse<IUserGroup[]>> => {
    return apiInstance.get("/roles", { params });
  },
  createUserGroup: async (body: IUserGroupPayload) => {
    return apiInstance.post("/roles", body);
  },
  getPermissions: async (): Promise<IApiResponse<IPermissionResponse>> => {
    return apiInstance.get("/permissions");
  },
  createAssetRegion: async (body: IAreaPayload) => {
    return apiInstance.post("/areas", body);
  },
  removeUserGroup: async (id: string | number) => {
    return apiInstance.delete(`/roles/${id}`);
  },
  getUserGroupDataById: async (
    id: string | number
  ): Promise<IApiResponse<IUserGroupData>> => {
    return apiInstance.get(`/roles/${id}`);
  },
  assignPermissionUserGroup: async (
    id: string | number,
    body: IAssignPermissionUserGroupPayload
  ) => {
    return apiInstance.put(`/roles/permissions/${id}`, body);
  },
};
