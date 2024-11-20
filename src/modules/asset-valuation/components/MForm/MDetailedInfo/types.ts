import { IMFormProps } from "../types";

export interface IMDetailedInfoProps extends Pick<IMFormProps, "control"> {
  index: null | number;
}
