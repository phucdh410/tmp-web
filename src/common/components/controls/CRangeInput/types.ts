import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import { Dayjs } from "dayjs";

export interface ICDateRangeInputRef extends IFormInputComponentRef {}

export interface IDateRangeValues {
  start: Dayjs | Date | string | null | undefined;
  end: Dayjs | Date | string | null | undefined;
}

export interface ICDateRangeInputProps extends IFormInputComponentProps {
  value?: IDateRangeValues;
  defaultValues?: IDateRangeValues;
}
