import { PropsWithChildren, ReactNode } from "react";

export interface IOrbitingCirclesContainerProps extends PropsWithChildren {
  maxRadius: number;
  extraPadding?: number;
  centerNode?: ReactNode;
}
