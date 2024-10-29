//note: UPLOAD FILE
export interface IUploadResponse {
  extension: string;
  id: string;
  original_name: string;
  url: string;
}

export interface IUploadedFile extends Omit<IUploadResponse, "id"> {
  id: number;
}
