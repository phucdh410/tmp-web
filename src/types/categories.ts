//! LOẠI CCDC
export interface ICategory {
  id: string;
  code: string;
  name: string;
  note: string;
}

export interface ICategoryPayload {
  id?: string;
  code: string;
  name: string;
  note?: string;
}

export interface ICreatedCategoryResponse {
  id: string;
  code: string;
  name: string;
  note: string;
}
