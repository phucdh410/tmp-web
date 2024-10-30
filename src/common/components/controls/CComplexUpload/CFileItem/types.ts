import { IUploadResponse } from "@interfaces/upload";

export interface ICFileItemProps {
  fileData: IUploadResponse;
  index: number;
  onRemove: () => void;
}
