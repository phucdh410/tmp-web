import { useRef } from "react";
import { Controller, Path, useController } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllCategories } from "@hooks/options";
import { ICreatedCategoryResponse } from "@interfaces/categories";
import { MCategoryModal } from "@modules/category/components";
import { IMCategoryModalRef } from "@modules/category/components/MCategoryModal/types";

import { ICategoryInput, ICCategoryInputProps } from "./types";

export const CCategoryInput = <T extends ICategoryInput>({
  control,
  disabled,
}: ICCategoryInputProps<T>) => {
  //#region Data
  const { categories, refetch, loading } = useGetAllCategories();

  const modalRef = useRef<IMCategoryModalRef>(null);

  const {
    field: { onChange },
  } = useController({ control, name: "category_id" as Path<T> });
  //#endregion

  //#region Event
  const onCreateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    input?: string
  ) => {
    modalRef.current?.open(undefined, input);
  };

  const onGetCreatedData = (data: ICreatedCategoryResponse) => {
    if (data) onChange(data.id);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Controller
        control={control}
        name={"category_id" as Path<T>}
        render={({ field, fieldState: { error } }) => (
          <CAutocomplete
            options={categories}
            disabled={disabled}
            loading={loading}
            creatable
            onCreateClick={onCreateClick}
            error={!!error}
            placeholder="Chọn loại công cụ dụng cụ"
            isDirtyOptions
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
