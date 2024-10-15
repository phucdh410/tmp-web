import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";

export interface ICUploadRef extends IFormInputComponentRef {}

export interface IFile {
  id: string;
  originalName: string;
  url: string;
}

export interface ICUploadProps extends IFormInputComponentProps {
  file?: IFile;
}
