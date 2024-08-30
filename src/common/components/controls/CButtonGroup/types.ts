import { PropsWithChildren } from "react";

export interface ICButtonGroupProps extends PropsWithChildren {
  variant?: "text" | "outlined" | "contained";
  className?: string;
}
