import { SelectionOptions } from "../../types";

export interface IHeaderProps<T> {
  selection?: SelectionOptions<T>;
  disabled: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

export interface ICSelectionCellProps<T> {
  selection?: SelectionOptions<T>;
  checkboxValue: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  radioValue: T[keyof T];
}
