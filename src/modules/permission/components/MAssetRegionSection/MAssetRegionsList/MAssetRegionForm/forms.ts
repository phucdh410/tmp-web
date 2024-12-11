import { IAreaPayload } from "@interfaces/permissions";
import { object, ObjectSchema, string } from "yup";

export const DEFAULT_VALUES: IAreaPayload = {
  code: "",
  name: "",
};

export const assetRegionSchema: ObjectSchema<IAreaPayload> = object({
  code: string().required(),
  name: string().required(),
});
