import { IUploadedFile } from "@interfaces/upload";

export interface ICFileItemProps {
  fileData: IUploadedFile;
  index: number;
  onRemove: () => void;
}
