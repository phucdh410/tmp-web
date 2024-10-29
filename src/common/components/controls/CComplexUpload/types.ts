import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import { IUploadedFile } from "@interfaces/upload";

export interface ICComplexUploadRef extends IFormInputComponentRef {}

export interface ICComplexUploadProps extends IFormInputComponentProps {
  value: IUploadedFile[] | number[];
}
