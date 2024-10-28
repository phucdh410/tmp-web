import { useRef } from "react";
import { Controller, useController } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllCategories } from "@hooks/options";
import { ICreatedCategoryResponse } from "@interfaces/categories";
import { MCategoryModal } from "@modules/category/components";
import { IMCategoryModalRef } from "@modules/category/components/MCategoryModal/types";

import { IMCategoryInputProps } from "./types";

export const MCategoryInput = ({ control }: IMCategoryInputProps) => {
  //#region Data
  const { categories, refetch } = useGetAllCategories();

  const modalRef = useRef<IMCategoryModalRef | null>(null);

  const {
    field: { onChange },
  } = useController({ control, name: "category_id" });
  //#endregion

  //#region Event
  const onCreateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    input?: string
  ) => {
    modalRef.current?.open(undefined, input);
  };

  const onGetCreatedData = (data: ICreatedCategoryResponse) => {
    if (data) onChange(Number(data.id));
  };
  //#endregion

  //#region Render
  return (
    <>
      <Controller
        control={control}
        name="category_id"
        render={({ field, fieldState: { error } }) => (
          <CAutocomplete
            options={categories}
            creatable
            onCreateClick={onCreateClick}
            error={!!error}
            placeholder="Chọn loại công cụ dụng cụ"
            {...field}
          />
        )}
      />

      <MCategoryModal
        ref={modalRef}
        refetch={refetch}
        getSucceededData={onGetCreatedData}
      />
    </>
  );
  //#endregion
};
