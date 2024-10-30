//note: UPLOAD FILE
export interface IUploadResponse {
  extension: string;
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  original_name: string;
  url: string;
}
