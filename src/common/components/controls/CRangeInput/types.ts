import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import { Dayjs } from "dayjs";

export interface ICDateRangeInputRef extends IFormInputComponentRef {}

export interface IDateRangeValues {
  start: Dayjs | Date | string | null;
  end: Dayjs | Date | string | null;
}

export interface ICDateRangeInputProps extends IFormInputComponentProps {
  value?: IDateRangeValues;
}
