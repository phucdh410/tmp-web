import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import { DateView } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface ICDatepickerRef extends IFormInputComponentRef {}

export interface ICDatepickerProps extends IFormInputComponentProps {
  value?: string | Date | Dayjs | null;
  views?: DateView[];
  format?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  placeholder?: string;
  reduceAnimations?: boolean;
}
