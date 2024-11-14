//note: CHỨNG TỪ (NGUỒN GỐC HÌNH THÀNH)
export interface IDocumentInPayload {
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name?: string;
  id?: number;
  url?: string;
}

export interface IDocumentInDetailResponse {
  code: string;
  date: string | Date;
  extension: string;
  file_name: string;
  document_id: number;
  note: string;
  original_name: string;
  url: string;
}
