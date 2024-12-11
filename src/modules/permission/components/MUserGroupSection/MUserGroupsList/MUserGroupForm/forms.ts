import { IUserGroupPayload } from "@interfaces/permissions";
import { object, ObjectSchema, string } from "yup";

export const DEFAULT_VALUES: IUserGroupPayload = {
  code: "",
  name: "",
};

export const userGroupSchema: ObjectSchema<IUserGroupPayload> = object({
  code: string().required(),
  name: string().required(),
});
