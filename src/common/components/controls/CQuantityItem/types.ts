import { Control } from "react-hook-form";

export interface IQuantityAndUnit {
  unit: string;
  quantity: number;
}

export interface ICQuantityItemProps<T extends IQuantityAndUnit> {
  control: Control<T, any>;
}
