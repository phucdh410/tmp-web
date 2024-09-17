import {
  ICategoryResponse,
  ICreatedCategoryResponse,
} from "@interfaces/categories";

export interface IMCategoryModalRef {
  open: (editData?: ICategoryResponse, initialName?: string) => void;
}

export interface IMCategoryModalProps {
  refetch?: () => void;
  getSucceededData?: (data: ICreatedCategoryResponse) => void;
}
