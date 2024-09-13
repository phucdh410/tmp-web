import { ICategory, ICreatedCategoryResponse } from "@interfaces/categories";

export interface IMCategoryModalRef {
  open: (editData?: ICategory, initialName?: string) => void;
}

export interface IMCategoryModalProps {
  refetch?: () => void;
  getSucceededData?: (data: ICreatedCategoryResponse) => void;
}
