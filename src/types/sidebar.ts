import { ReactNode } from "react";

export interface ISidebarItem {
  label: string;
  path: string;
  icon?: ReactNode;
  children?: ISidebarItem[];
}
