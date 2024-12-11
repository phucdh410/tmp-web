import { apiInstance } from "@axios/index";
import {
  IAddUsersToTPMPayload,
  IArea,
  IParamsToGetUsersFromPos,
  IPermissionResponse,
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
  getAreas: (): Promise<IApiResponse<IArea[]>> => {
    return apiInstance.get("/areas");
  },
  getUserGroups: (): Promise<IApiResponse<IUserGroup[]>> => {
    return apiInstance.get("/roles");
  },
  createUserGroups: (body: IUserGroupPayload) => {
    return apiInstance.post("/roles", body);
  },
  getPermissions: async (): Promise<IApiResponse<IPermissionResponse>> => {
    return apiInstance.get("/permissions");
  },
};
