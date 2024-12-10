import { apiInstance } from "@axios/index";
import {
  IParamsToGetUsersFromPos,
  IUserFromPos,
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
};
