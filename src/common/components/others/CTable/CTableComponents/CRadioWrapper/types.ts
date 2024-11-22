import { PropsWithChildren } from "react";

export interface ICRadioWrapperProps<T extends object>
  extends PropsWithChildren {
  type: "checkbox" | "radio";
  value?: T[keyof T];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}
