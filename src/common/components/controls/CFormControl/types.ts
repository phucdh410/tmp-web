import { ReactNode } from "react";

import { IFormInputComponentProps } from "@interfaces/form";

export interface ICFormControlProps
  extends Pick<IFormInputComponentProps, "error" | "errorText"> {
  children?: ReactNode;
  fullWidth?: boolean;
}
