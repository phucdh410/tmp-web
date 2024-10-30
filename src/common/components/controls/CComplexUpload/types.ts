import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import { IUploadResponse } from "@interfaces/upload";

export interface ICComplexUploadRef extends IFormInputComponentRef {}

export interface ICComplexUploadProps extends IFormInputComponentProps {
  value: IUploadResponse[] | number[];
}
