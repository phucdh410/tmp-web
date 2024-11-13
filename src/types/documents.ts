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
