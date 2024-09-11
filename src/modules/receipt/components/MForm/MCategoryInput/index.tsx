import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllCategories } from "@hooks/options";

import { IMCategoryInputProps } from "./types";

export const MCategoryInput = ({ control }: IMCategoryInputProps) => {
  //#region Data
  const { categories } = useGetAllCategories();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="loai_ccdc"
      render={({ field }) => (
        <CAutocomplete options={categories} creatable {...field} />
      )}
    />
  );
  //#endregion
};
