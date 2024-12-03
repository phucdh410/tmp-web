import { IOrbitingItemProps } from "../OrbitingItem/types";

export interface INodeItem extends Omit<IOrbitingItemProps, "radius"> {}

export interface IOrbitingCircleProps {
  radius: number;
  duration: number;
  nodes: INodeItem[];
}
