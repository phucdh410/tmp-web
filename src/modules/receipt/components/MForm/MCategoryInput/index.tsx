import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllCategories } from "@hooks/options";

import { IMCategoryInputProps } from "./types";

export const MCategoryInput = ({ control, isEdit }: IMCategoryInputProps) => {
  //#region Data
  const { categories } = useGetAllCategories();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="category_id"
      render={({ field }) => (
        <CAutocomplete
          disabled={isEdit}
          options={categories}
          creatable
          {...field}
        />
      )}
    />
  );
  //#endregion
};
