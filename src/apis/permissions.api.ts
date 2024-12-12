import { apiInstance } from "@axios/index";
import {
  IAddUsersToTPMPayload,
  IArea,
  IAreaPayload,
  IParamsToGetUsersFromPos,
  IPermissionResponse,
  IUserData,
  IUserDataPayload,
  IUserFromPos,
  IUserGroup,
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
  getUserDatById: async (
    id: string | number
  ): Promise<IApiResponse<IUserData>> => {
    return apiInstance.get(`/users/${id}`);
  },
  updateUserData: async (id: string | number, body: IUserDataPayload) => {
    return apiInstance.put(`/users/assignee/${id}`, body);
  },
  getAreas: (): Promise<IApiResponse<IArea[]>> => {
    return apiInstance.get("/areas");
  },
  getUserGroups: (): Promise<IApiResponse<IUserGroup[]>> => {
    return apiInstance.get("/roles");
  },
  createUserGroup: (body: IUserGroupPayload) => {
    return apiInstance.post("/roles", body);
  },
  getPermissions: async (): Promise<IApiResponse<IPermissionResponse>> => {
    return apiInstance.get("/permissions");
  },
  createAssetRegion: (body: IAreaPayload) => {
    return apiInstance.post("/areas", body);
  },
};
