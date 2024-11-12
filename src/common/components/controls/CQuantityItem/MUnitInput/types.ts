import { ICQuantityItemProps, IQuantityAndUnit } from "../types";

export interface ICUnitInputProps<T extends IQuantityAndUnit>
  extends Pick<ICQuantityItemProps<T>, "control"> {
  disabled?: boolean;
}
