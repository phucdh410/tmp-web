import { ReactNode } from "react";

//note: SIDEBAR
export interface ISidebarItem {
  label: string;
  path: string;
  icon?: ReactNode;
  children?: ISidebarItem[];
}
