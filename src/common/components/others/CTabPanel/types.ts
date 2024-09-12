import { PropsWithChildren } from "react";

export interface ICTabPanelProps extends PropsWithChildren {
  value: string | number | boolean;
  tabValue: string | number | boolean;
}
