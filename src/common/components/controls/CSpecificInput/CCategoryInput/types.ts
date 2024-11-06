import { Control } from "react-hook-form";

export interface ICategoryInput {
  category_id: number;
}

export interface ICCategoryInputProps<T extends ICategoryInput> {
  control: Control<T, any>;
  disabled?: boolean;
}
